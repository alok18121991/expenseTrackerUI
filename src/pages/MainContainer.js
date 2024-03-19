import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import FooterMenu from "./Footer/footerMenu";



function MainContainer() {
    return (
      <Container>
        <Row className="App-header">
          <Col className='outlet'>
            <Outlet />
          </Col>
        </Row>
        <Row className="footer-menu flex-row">
          <FooterMenu />
        </Row>
      </Container>
    )
}

export default MainContainer;