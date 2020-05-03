import {ContentContainer} from "../../components/containers/content-container";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {ScheduleContext, ScheduleProvider} from "./schedule-context";
import {makePromise} from "../../utils/functions";
import React, {useEffect, useState} from "react";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import "./calendar.css";




const Calendar = () => {

  // Get the scheduler context
  const scheduleContext = React.useContext(ScheduleContext);

  // Generate an array containing the weekdays names (short names)
  const weekDayShort = moment.weekdaysShort();

  // Save a reference of the actual moment.
  const [dateObject, __] = useState(moment());

  const [active, setActive] = useState(0);

  // Save a reference to days in actual month (dateObject),
  // it'll be refreshed all the time user change the month.
  const [days, setDays] = useState([]);

  // Increase one month in the initial dateObject. This function
  // alters the object date reference and aways it executed the
  // alterations are saved at the object level
  const increaseMonth = () => {

    // Fit asynchronous call to setState into a promise and
    // only when the setState is done we update the layout
    let setDaysPromise = makePromise(setDays, [])

    setDaysPromise.then(() => {
      dateObject.add(1, "M");
      fillDays()
    })
  }

  // Decrease one month in the initial dateObject. This function
  // alters the object date reference and aways it executed the
  // alterations are saved at the object level
  const decreaseMonth = () => {

    // Fit asynchronous call to setState into a promise and
    // only when the setState is done we update the layout
    let setDaysPromise = makePromise(setDays, [])

    setDaysPromise.then(() => {
      dateObject.subtract(1, "M");
      fillDays()
    })
  }

  // Increase one year in the initial dateObject. This function
  // alters the object date reference and aways it executed the
  // alterations are saved at the object level
  const increaseYear = () => {

    // Fit asynchronous call to setState into a promise and
    // only when the setState is done we update the layout
    let setDaysPromise = makePromise(setDays, [])

    setDaysPromise.then(() => {
      dateObject.add(1, "y");
      fillDays()
    })
  }

  // Decrease one year in the initial dateObject. This function
  // alters the object date reference and aways it executed the
  // alterations are saved at the object level
  const decreaseYear = () => {

    // Fit asynchronous call to setState into a promise and
    // only when the setState is done we update the layout
    let setDaysPromise = makePromise(setDays, [])

    setDaysPromise.then(() => {
      dateObject.subtract(1, "y");
      fillDays()
    })
  }

  // Return an array with the previous month days reversed
  const getReverseDays = () => {

    // First info we need to know is witch weekday
    // the month starts (assert it is an integer)
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
      let prev = dateObjectCopy.daysInMonth() - day
      reversed.push(
        {
          classNames: "text-muted previous-day slide-in-right rounded",
          value: prev,
        }
      )
    }

    // return the reversed days
    return reversed.reverse()
  }

  // Returns true if the given day is today or is
  // active by user click and false in another case
  const isActive = (day) => {

    let date = moment();

    return (
      (dateObject.format("M") === date.format("M")) &&
      (dateObject.format("Y") === date.format("Y")) &&
      (day === parseInt(date.format("D")))
    )
  }

  // Get the reversed days and all days in the month.
  // Place all together and return as rows and cells
  const fillDays = () => {

    let actualDays = [];
    let nextMonthDay = 1;

    // Generate actual days.
    for (let day = 1; day <= dateObject.daysInMonth(); day++){
      actualDays.push(
        {
          classNames: `text-light day scale-in rounded`,
          value: day
        }
      )
    }

    // Generate the reversed days count
    let reversed = getReverseDays();

    // Place all together
    let calendar = [...reversed, ...actualDays]

    let cells = []
    let rows = [];

    calendar.forEach((row, i) => {

      // if index not equal 7 that
      // means not go to next week
      if (i % 7 !== 0) {
        cells.push(row);
      } else {

        // when reach next week we contain
        // all td in last week to rows
        rows.push(cells);

        // empty container
        cells = [];

        // in current loop we still push
        // current row to new container
        cells.push(row);
      }

      // when end loop we add remain date
      // and fill with next month days
      if (i === calendar.length - 1) {
        for (; cells.length < 7; nextMonthDay++){
          cells.push(
            {
              classNames: "text-muted next-day slide-in-left rounded",
              value: nextMonthDay
            }
          )
        }
        rows.push(cells);
      }
    });

    if (rows.length < 7) {
      let lastCell = [];
      for (let day = 0; day < 7; day++){
        nextMonthDay = nextMonthDay + 1
        lastCell.push(
          {
            classNames: "text-muted next-day slide-in-left rounded",
            value: nextMonthDay
          }
        )
      }
      rows.push(lastCell)
    }

    // Finally update the days state. When it is
    // done the hole component is updated
    setDays([...rows])
  }

  useEffect(() => {
    fillDays()
  }, [
    dateObject
  ])

  return (
    <ContentContainer backgroundColor="#0D1D29">
      <div className="d-flex">
        <div className="calendar w-50">
          <div className="d-flex justify-content-around align-items-center w-100">

            <MdKeyboardArrowLeft
              className="text-light align-self-center"
              onClick={decreaseMonth}
              size={22}
            />

            <span className="text-danger font-weight-bolder" onClick={decreaseYear}>
              {parseInt(dateObject.format("YYYY")) - 1}
            </span>

            <h4 className="text-light text-monospace text-uppercase">
              {dateObject.format("MMM, YYYY")}
            </h4>

            <span className="text-danger font-weight-bolder" onClick={increaseYear}>
              {parseInt(dateObject.format("YYYY")) + 1}
            </span>

            <MdKeyboardArrowRight
              className="text-light align-self-center"
              onClick={increaseMonth}
              size={22}
            />
          </div>

          <div className="w-100 d-flex justify-content-around">
            {
              weekDayShort.map(day => (
                <span key={day} className="text-white-50 font-weight-bold weekday py-2">
                  {day[0]}
                </span>
              ))
            }
          </div>

          {
            days.map(week => (
              <div className="w-100 d-flex justify-content-around">
                {
                  week.map(day => (
                    <span
                      className={` ${day.classNames} + ${scheduleContext.activeDay === day.value ? " active" : ""} `}
                      onClick={() => {scheduleContext.setActiveDay(day.value)}}>
                      {String(day.value).padStart(2, '0')}
                    </span>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </ContentContainer>
  )
}

export const Scheduler = () => {
  return (
    <ScheduleProvider>
      <Calendar/>
    </ScheduleProvider>
  )
}