import {makePromise} from "../../utils/functions";
import React, {useEffect, useState} from "react";
import * as moment from 'moment';
import 'moment/locale/pt-br';


// Provides the schedule context
export const ScheduleContext = React.createContext({
  setActiveDay: () => {},
  goTo: () => {},
  dateObject: null,
  activeDay: false,
  calendar: null,
  weekdays: null,
})

export const ScheduleProvider = (props) => {

  // Array containing the weekdays
  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"]

  // Handle the active day in calendar
  const [activeDay, setActiveDay] = React.useState(
      parseInt(moment().format("D")
    )
  )

  // Save a reference of the moment.
  const [dateObject, __] = useState(moment());

  // Save a reference of the moment.
  const [calendar, setCalendar] = useState([]);


   // Change the actual month/year in prev/next based on actual date.
   // This function alters the object date reference and aways it
   // @param direction: A string containing "next" or "prev" words
   // @param unit: A string containing "M" value for month or "y" for year
  function goTo(direction, unit) {

    // Fit asynchronous call to setState into a promise and only when
    // the setState is done we execute another peace of code
    let setDaysPromise = makePromise(setCalendar, [])

    setDaysPromise.then(() => {
      if (direction === 'prev') {
        // In other case the direction is prev, we need to
        // subtract one month to the date object reference
        dateObject.subtract(1, unit);
        makeCalendar()

      } else {
        // If the direction is next, we need to add
        // one month to the date object reference
        dateObject.add(1, unit);
        makeCalendar()
      }
    })
  }

  // Return an array with the previous month days reversed
  function getPrevDays() {

    // First step we need to know is witch weekday
    // the month starts and assert it is an integer
    let actualMonthStartAt = parseInt(
      dateObject
        .startOf("month")
        .format("d")
    )

    // Creates a copy of the actual date and
    // in the copy we subtract one month.
    let dateObjectCopy = dateObject.clone();
    dateObjectCopy.subtract(1, "M")

    let reversed = [];

    // We take the weekday the month starts and count subtracting
    // the total weekdays from the previous month total days.
    for (let day = 0; day < actualMonthStartAt; day++){
      reversed.push({
        classNames: "text-muted rounded prev-day",
        callback: () => {goTo("prev", "M")},
        value: dateObjectCopy.daysInMonth() - day,
      })
    }

    // return the reversed days
    return reversed.reverse()
  }

  // Returns an array with the actual month days
  function getActualDays(){

    // How many days has the month
    let daysInMonth = dateObject.daysInMonth();
    let actualDays = []

    for (let day = 1; day <= daysInMonth; day++){
      actualDays.push({
        classNames: "text-light rounded actual-day",
        callback: () => {},
        value: day,
      })
    }

    // return the actual days
    return actualDays;
  }

  function fillDays(){
    // Place the lasts previous month day and the actual month day range.
    let days = [...getPrevDays(), ...getActualDays()];

    // Fill the left days to complete 42 days in the calendar.
    for (let day = 1; days.length < 42; day++ ){
      days.push({
        classNames: "text-muted rounded next-day",
        callback: () => {goTo("next", "M")},
        value: day,
      })
    }

    // return all days
    return days
  }

  function makeCalendar() {
    let allDays = fillDays();

    let month = [];
    let week = [];

    // Generate an array (grid 6X7) containing
    // all the weeks in te month and such week
    // with the respective days
    allDays.forEach((day, index) => {

      // If the index is a multiple of 7 so we close the week.
      if (!Boolean((index + 1) % 7)) {

        // Push the last weekday to week,
        // push the week to the month and
        // clear the week array.
        week.push(day);
        month.push(week);
        week = [];

      } else {
        // Push the weekday to week
        week.push(day);
      }
    })

    // Update the calendar state;
    setCalendar(month)
  }

  const values = {
    setActiveDay: setActiveDay,
    dateObject: dateObject,
    activeDay: activeDay,
    calendar: calendar,
    weekdays: weekdays,
    goTo: goTo
  }

  useEffect(() => {
    makeCalendar()
  }, [])

  return (
    // Provides the context
    <ScheduleContext.Provider value={values}>
      {props.children}
    </ScheduleContext.Provider>
  )
}