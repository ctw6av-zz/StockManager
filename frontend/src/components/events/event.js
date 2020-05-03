import * as moment from 'moment';
import React from "react";

export const Event = () => {
  return (
    <div className="bg-light rounded p-2">
      <div className="d-flex justify-content-between text-muted">
        <span>{moment().add(1, 'days').calendar()}</span>
      </div>

    </div>
  )
}