import {AiOutlineFullscreen, AiOutlineFullscreenExit} from "react-icons/ai";
import {TabsContext} from "../tabs/tabs-context";
import React from "react";

// Switch component to make the content container bigger.
// It should receive a iconStyle as props and it can
// contains to values:
// icon-light -> When in dark background colors;
// icon-dark -> When in clear background colors;
export const SwitchFullScreen = (props) => {

  const tabs = React.useContext(TabsContext);
  const {iconStyle} = props;

  return (
    <div className="d-flex justify-content-end px-3">
      {
        tabs.collapsed ?
          <AiOutlineFullscreenExit className={`icon ${iconStyle ? iconStyle : "icon-light"} fade-in`} size={20} onClick={() => tabs.setCollapsed(!tabs.collapsed)}/>
        :
          <AiOutlineFullscreen className={`icon ${iconStyle ? iconStyle : "icon-light"} fade-in`} size={20} onClick={() => tabs.setCollapsed(!tabs.collapsed)}/>
      }
    </div>
  )
}
