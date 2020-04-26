import {SwitchFullScreen} from "../switchers/switchers";
import {LoadAnimation} from "../loading/loader-manager";
import './content-container.css';
import React from 'react';

// Handle all pages content. All the app pages
// should be encapsulated by this component.
export const ContentContainer = (props) => {

  const {backgroundColor, iconStyle} = props;

  return (
    <div className="slide-in-top content overflow-auto h-100 px-5 py-4" style={{backgroundColor: backgroundColor}}>
      <LoadAnimation>
        <SwitchFullScreen iconStyle={iconStyle}/>
        {props.children}
      </LoadAnimation>
    </div>
  )
}