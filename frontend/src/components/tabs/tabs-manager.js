import {TabsContext} from "./tabs-context";
import {FcAreaChart} from 'react-icons/fc';
import {Nav, Tab} from "react-bootstrap";
import {FiSearch} from 'react-icons/fi';
import {FiBell} from 'react-icons/fi';
import {MdMenu} from 'react-icons/md';
import './tabs-manager.css';
import React from "react";
import {LoadingContext} from "../loading/loading-context";

// This is the manager of all tabs in the system
// All tabs are passed as props to the context
// manager in app index so the hole app can see
// all tabs available in the system.
export const TabManager = () => {

  const tabs = React.useContext(TabsContext);

  return (
    <Tab.Container id="left-tabs" activeKey={tabs.activeKey}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="left-tabs">
          <div className="d-flex h-100">
            <Nav variant="pills" className={`d-flex flex-column tabs ${tabs.collapsed ? "left-tabs-collapsed": "left-tabs-expanded"} `}>
              <div className="d-flex flex-column h-100">

                {/* Sidebar branding */}
                <div className="d-flex justify-content-center py-5">
                  <FcAreaChart className={`brand ${tabs.collapsed ? "brand-collapsed" : "brand-expanded"}`}/>
                </div>

                {/* Center menu */}
                <div className="h-100 pt-3">
                  {
                    !tabs.collapsed ?
                      tabs.routes.map(({name, listed, bottom}) => (
                        listed && !bottom ?
                          // If the component is listed we can
                          // return an item to be displayed in nav
                          // end in other case we'll return null
                          <Nav.Item className={tabs.collapsed ? "fade-out d-none" : "fade-in d-block"}>
                            <div onClick={() => tabs.setActiveKey(name)}>
                              <Nav.Link className="font-weight-bolder text-muted rounded-0" eventKey={name}>
                                <span className="pl-3">
                                  {name}
                                </span>
                              </Nav.Link>
                            </div>
                          </Nav.Item>
                          : null
                      ))
                    :
                      <div className={tabs.collapsed ? "fade-in d-block h-100": "fade-out d-none"}>
                        <div className="d-flex justify-content-center h-100 mt-4">
                          <MdMenu size={28} className="icon-menu text-muted" onClick={() => tabs.setCollapsed(false)}/>
                        </div>
                      </div>
                  }
                </div>

                {/* Bottom menu */}
                <div className="pb-5">
                  {
                    // When the tabs are collapsed we display nothing
                    // in other case we display only what is with the
                    // "bottom" key as true.
                    !tabs.collapsed ?
                      tabs.routes.map(({name, bottom}) => (
                        bottom ?
                          <Nav.Item className={tabs.collapsed ? "fade-out d-none" : "fade-in d-block"}>
                            <span onClick={() => tabs.setActiveKey(name)}>
                              <Nav.Link className="text-muted rounded-0" eventKey={name}>
                                <span className="pl-3">
                                  {name}
                                </span>
                              </Nav.Link>
                            </span>
                          </Nav.Item>
                          : null
                      ))
                      : null
                  }
                </div>
              </div>
            </Nav>

            {/* Tabs content */}
            <Tab.Content className="d-flex flex-column w-100">

              {/* Top bar */}
              <div className="d-flex justify-content-end py-3 px-5">
                <FiSearch size={18} className="icon icon-light mr-3" onClick={() => tabs.setActiveKey("Procurar")}/>
                <FiBell size={18} className="icon icon-light mr-3"/>
              </div>

              {
                // Here all components routes are available and
                // depending on "listed" key to be visible
                tabs.routes.map(({name, Component}) => (
                  <Tab.Pane eventKey={name} className={`pane ${tabs.collapsed ? "pane-expanded" : "pane-collapsed"} overflow-auto h-100`}>
                    <Component/>
                  </Tab.Pane>
                ))
              }
            </Tab.Content>
          </div>
        </div>
      </div>
    </Tab.Container>
  )
}