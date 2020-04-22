import {TabsContext} from '../tabs/tabs-context'
import React from 'react';
import './style.css';

export const ContentContainer = (props) => {

  const tabContext = React.useContext(TabsContext);
  const {backgroundColor} = props;

  return (
    <div className={`slide-in-top ${tabContext.collapsed ? "content-expanded" : "content-collapsed"} h-100 p-4`} style={{backgroundColor: backgroundColor}}>
      {props.children}
    </div>
  )
}