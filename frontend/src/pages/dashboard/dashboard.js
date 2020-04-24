import {AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineHeart} from "react-icons/ai";
import {ContentContainer} from "../../components/containers/content-container";
import {TabsContext} from "../../components/tabs/tabs-context";
import {BsFileEarmarkPlus, BsExclude} from "react-icons/bs";
import {Col, Container, Row} from "react-bootstrap";
import {MdSync} from "react-icons/md";
import React from "react";
import './style.css';


export const Dashboard = () => {

  const context = React.useContext(TabsContext)

  const shortcutsTop = [
    {name: "Reposição", Icon: MdSync, callback: () => {alert("Not implemented!")}},
    {name: "Adicionar Produto", Icon: BsFileEarmarkPlus, callback: () => {alert("Not implemented!")}},
    {name: "Mensagens", Icon: BsExclude, callback: () => {context.setActiveKey("Mensagens")}},
    {name: "Mais", Icon: AiOutlineHeart, callback: () => {alert("Not implemented!")}},
  ]

  const shortcutsBottom = [
    {name: "Novo", callback: () => {}},
    {name: "Novo", callback: () => {}},
    {name: "Novo", callback: () => {}},
    {name: "Novo", callback: () => {}},
  ]

  return (
    <ContentContainer backgroundColor="#0D1D29">
      <Container className="d-flex justify-content-end">
        {
          context.collapsed ?
            <AiOutlineFullscreenExit className="icon icon-light fade-in" size={22} onClick={() => context.setCollapsed(!context.collapsed)}/>
          :
            <AiOutlineFullscreen className="icon icon-light fade-in" size={22} onClick={() => context.setCollapsed(!context.collapsed)}/>
        }
      </Container>
      <Container className="text-light">
        <h5 className="font-weight-bold slide-in-top pb-4">Dashboard</h5>
        <Row>
          {
            shortcutsTop.map(({name, Icon, callback}) => (
              <Col md={3}>
                <div className="d-flex flex-column align-items-center shortcut shortcut-top rounded shadow-sm fade-in h-100 p-5" onClick={callback}>
                  <Icon size={48} className="icon text-info mb-3"/>
                  <p className="font-weight-bolder text-wrap text-center">{name}</p>
                </div>
              </Col>
            ))
          }
        </Row>
        <Row className="pt-5">
          {
            shortcutsBottom.map(({name, callback}) => (
              <Col md={3}>
                <div className="d-flex flex-column align-items-center shortcut shortcut-bottom fade-in p-2" onClick={callback}>
                  <p className="text-wrap text-center p-0 m-0">{name}</p>
                </div>
              </Col>
            ))
          }
        </Row>

      </Container>
    </ContentContainer>
  )
};
