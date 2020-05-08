import {ContentContainer} from "../../components/containers/content-container";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {ScheduleContext, ScheduleProvider} from "./schedule-context";
import React from "react";
import "./schedule.css";
import moment from "moment";
import {Button} from "react-bootstrap";
import {FiTrash2} from 'react-icons/fi';

const Calendar = () => {

  // Get the scheduler context
  const scheduleContext = React.useContext(ScheduleContext);

  return (
    <div>
      <div className="d-flex justify-content-around align-items-center w-100">

        <MdKeyboardArrowLeft
          className="text-light align-self-center"
          onClick={() => scheduleContext.goTo("prev", "M")}
          size={22}
        />

        <span className="text-danger font-weight-bolder" onClick={() => scheduleContext.goTo("prev", "y")}>
          {parseInt(scheduleContext.dateObject.format("YYYY")) - 1}
        </span>

        <h4 className="text-light text-monospace text-uppercase">
          {scheduleContext.dateObject.format("MMM, YYYY")}
        </h4>

        <span className="text-danger font-weight-bolder fade-in" onClick={() => scheduleContext.goTo("next", "y")}>
          {parseInt(scheduleContext.dateObject.format("YYYY")) + 1}
        </span>

        <MdKeyboardArrowRight
          className="text-light align-self-center"
          onClick={() => scheduleContext.goTo("next", "M")}
          size={22}
        />
      </div>

      <div className="w-100 d-flex justify-content-around">
        {
          scheduleContext.weekdays.map(day => (
            <span key={day} className="text-white-50 font-weight-bold weekday py-2">
              {day[0]}
            </span>
          ))
        }
      </div>

      {
        scheduleContext.calendar.map(week => (
          <div className="w-100 d-flex justify-content-around fade-in">
            {
              week.map(day => (
                <span
                  className={` ${day.classNames} ${scheduleContext.activeDay === day.value ? " active" : ""} `}
                  onClick={() => {scheduleContext.setActiveDay(day.value); day.callback();}}>
                  {String(day.value).padStart(2, '0')}
                </span>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

const Events = () => {

  const scheduleContext = React.useContext(ScheduleContext);
  let events = {}

  return (
    <div className="w-50 px-4 events-container">
      <div className="event-date text-right mb-3">
        <span className="text-muted">{scheduleContext.activeDay} de </span>
        <span className="text-muted">{scheduleContext.dateObject.format("MMMM")} de </span>
        <span className="text-muted">{scheduleContext.dateObject.format("YYYY")}</span>
      </div>
      <div>
        {
          events.length ?
            events[scheduleContext.activeDay].map(event => (
              <div className="d-flex align-items-center slide-in-left border-left border-dark event h-auto">

                <div className="pr-2 h-100">
                  <p className="text-white event-hour m-0 p-0">{moment(event.date).format("hh")}</p>
                </div>

                <div className="w-100 h-100">
                  <p className="text-light event-title text-truncate m-0 p-0">{event.title}</p>
                  <p className="text-white-50 event-relative m-0 p-0">Acontece {moment(event.date).fromNow()}</p>
                  <p className="text-light event-hour-low m-0 p-0">às {moment(event.date).format("hh:mm")}</p>
                </div>
                <div>
                  <Button variant="transparent">
                    <FiTrash2 size={14} className="text-danger"/>
                  </Button>
                </div>
              </div>
            ))
          :
            <div className="d-flex flex-column align-items-center">
              <p className="text-muted my-5">Nenhum evento agendado!</p>
            </div>
        }
      </div>
    </div>

  )
}

export const Scheduler = () => {

  return (
    <ContentContainer backgroundColor="#0D1D29">
      <ScheduleProvider>
        <div className="d-flex h-100">
          <div className="w-50">
            <Calendar/>
            <div className="d-flex justify-content-end mt-4 pr-3">
              <Button variant={"info"} disabled>Novo Evento</Button>
            </div>
          </div>
          <Events/>
        </div>
      </ScheduleProvider>
    </ContentContainer>
  )
}