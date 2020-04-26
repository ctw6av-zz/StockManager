import {ContentContainer} from "../../components/containers/content-container";
import {TabsContext} from "../../components/tabs/tabs-context";
import {Shortcut, ShortcutLight} from "../../components/shortcuts/shortcuts";
import {Col, Container, Row} from "react-bootstrap";
import React from "react";

export const Dashboard = () => {

  // Contains the shortcuts positioned at the top of dashboard page
  const shortcutsTop = [
    {name: null, Icon: null, callback: null, add: true}
  ]

  // Contains the shortcuts positioned at the bottom of dashboard page
  // The last one should be always of type "add"
  const shortcutsBottom = [
    {name: null, callback: null, add: true}
  ]

  return (
    <ContentContainer backgroundColor="#0D1D29">
      <Container className="text-light">

        <h5 className="font-weight-bold slide-in-top pb-4">Dashboard</h5>

        <Row className="slide-in-top">
          {
            shortcutsTop.map((data) => (
              <Col md={3} className="mb-3">
                <Shortcut {...data}/>
              </Col>
            ))
          }
        </Row>

        <Row className="slide-in-top my-3">
          {
            shortcutsBottom.map((data) => (
              <Col md={3} className="mb-3">
                <ShortcutLight {...data}/>
              </Col>
            ))
          }
        </Row>

      </Container>
    </ContentContainer>
  )
};
