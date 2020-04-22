import {TabsContext, TabsContextProvider} from "./tabs-context";
import {FcAreaChart} from 'react-icons/fc';
import {Nav, Tab} from "react-bootstrap";
import {FiSearch} from 'react-icons/fi';
import {FiBell} from 'react-icons/fi';
import {MdMenu} from 'react-icons/md';
import React from "react";
import './style.css';


export const TabManager = () => {

  const context = React.useContext(TabsContext);

  return (
    <Tab.Container id="left-tabs" activeKey={context.activeKey}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="left-tabs shadow">

          <div className="d-flex h-100">
            <Nav variant="pills" className={`d-flex flex-column tabs ${context.collapsed ? "collapsed": "expanded"} `}>
              <div className="d-flex flex-column h-100">

                {/* Sidebar branding */}
                <div className="d-flex justify-content-center py-5">
                  <FcAreaChart className={context.collapsed ? "brand-collapsed" : "brand-expanded" } color={"#39adae"}/>
                </div>

                {/* Menu */}
                <div className="h-100 pt-3">
                  <div className={context.collapsed ? "fade-in d-block h-100": "fade-out d-none"}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <MdMenu size={28} className="icon-menu" onClick={() => context.setCollapsed(false)}/>
                    </div>
                  </div>
                  {
                    !context.collapsed ?
                      context.routes.map(({name, listed, bottom}) => (
                        listed && !bottom ?
                          // If the component is listed we can
                          // return an item to be displayed in
                          // nav end in other case we return null
                          <Nav.Item className={context.collapsed ? "fade-out d-none" : "fade-in d-block"}>
                            <div onClick={() => context.setActiveKey(name)}>
                              <Nav.Link className="font-weight-bolder text-muted rounded-0" eventKey={name}>
                                <span className="pl-3">
                                  {name}
                                </span>
                              </Nav.Link>
                            </div>
                          </Nav.Item>
                          : null
                      ))
                      : null
                  }
                </div>
                <div className="pb-3">
                  {
                    !context.collapsed ?
                      context.routes.map(({name, bottom}) => (
                        bottom ?
                          <Nav.Item className={context.collapsed ? "fade-out d-none" : "fade-in d-block"}>
                            <span onClick={() => context.setActiveKey(name)}>
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
            <Tab.Content className="d-flex flex-column w-100">

              <div className="d-flex justify-content-end align-items-center px-3 py-2">
                <div className="mx-5">
                  <FiSearch size={20} className="text-muted mx-3" onClick={() => {context.setActiveKey("Search") && context.setCollapsed(false)}}/>
                  <FiBell size={20} className="text-muted"/>
                </div>
                <img width={28} className="rounded-circle" src="https://yt3.ggpht.com/a-/AOh14Ghp-xieqtM2pfPsD0TYnOVBAw46HnjpRciLVyG2kw=s88-c-k-c0xffffffff-no-rj-mo"/>
              </div>

              {
                // Here all components routes are available and
                // depending on "listed" key to be visible
                context.routes.map(({name, Component}) => (
                  <Tab.Pane eventKey={name} className={`content ${context.collapsed ? "" : "pb-5"} h-100`}>
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