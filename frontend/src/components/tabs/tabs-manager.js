import {TabsContext} from "./tabs-context";
import {Nav, Tab} from "react-bootstrap";
import React from "react";
import './style.css';


export const TabManager = () => {

  const context = React.useContext(TabsContext);

  return (
    <Tab.Container id="left-tabs" activeKey={context.activeKey}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="d-flex left-tabs shadow-lg">
          <Nav variant="pills" className="flex-column tabs">
            {
              context.routes.map(({name, listed}) => (
                // If the component is listed we can
                // return an item to be displayed in
                // nav end in other case we return null
                listed ?
                  <Nav.Item>
                    <span onClick={() => context.setActiveKey(name)}>
                      <Nav.Link className="rounded-0" eventKey={name}>
                        {name}
                      </Nav.Link>
                    </span>
                  </Nav.Item>
                  : null
              ))
            }
          </Nav>
          <Tab.Content className="content w-100 p-2">
            {
              // Here all components routes are available and
              // depending on "listed" key to be visible
              context.routes.map(({name, Component}) => (
                <Tab.Pane eventKey={name}>
                  <Component/>
                </Tab.Pane>
              ))
            }
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  )
}