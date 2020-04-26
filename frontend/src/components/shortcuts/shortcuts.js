import {AiOutlinePlus} from "react-icons/ai";
import React from "react";
import "./shortcuts.css";

// Shortcut component. It should receive as props a name,
// an icon and a callback, or only a key "add". When "add"
// props is set to true the component returns a dotted
// shortcut that can add new shortcuts.
export const Shortcut = (props) => {

  const {name, Icon, callback, add} = props;

  return (
    <div className={`d-flex flex-column align-items-center shadow-sm shortcut ${add ? "shortcut-add" : "shortcut-top"} rounded h-100 pt-5 px-5 pb-2`} onClick={callback}>
      { Icon ? <Icon size={32} className="icon text-info mb-4"/> : <AiOutlinePlus size={32} className="icon mb-4"/> }
      <p className="font-weight-bolder text-wrap text-center m-0 p-0">{name ? name : "Novo"}</p>
    </div>
  )
}


// Shortcut light component. It should receive a name and
// a callback, as props, or only a key "add". When "add"
// props is set to true the component returns a dotted
// shortcut that can add new shortcuts.
export const ShortcutLight = (props) => {

  const {name, callback, add} = props;

  return (
    <div className={`text-center shadow-sm rounded shortcut ${add ? "shortcut-add" : "shortcut-bottom"} p-2`} onClick={callback ? callback : null}>
      <p className="text-wrap text-center p-0 m-0">{name ? name : "Novo"}</p>
    </div>
  )
}