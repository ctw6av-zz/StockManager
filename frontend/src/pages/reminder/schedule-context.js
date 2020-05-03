import * as moment from 'moment';
import React from "react";

// Provides the app calendar context
export const ScheduleContext = React.createContext({
  setActiveDay: () => {},
  activeDay: false
})

export const ScheduleProvider = (props) => {

  // Handle the schedule state
  const [activeDay, __] = React.useState(
    parseInt(moment().format("D"))
  )

  const setActiveDay = (day) => {
    __(prevState => {
      prevState = day
      return prevState
    })
  }

  const values = {
    setActiveDay: setActiveDay,
    activeDay: activeDay
  }

  return (
    // Provides the context
    <ScheduleContext.Provider value={values}>
      {props.children}
    </ScheduleContext.Provider>
  )
}