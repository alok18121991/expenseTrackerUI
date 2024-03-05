import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import FooterMenu from "./Footer/footerMenu";



class MainContainer extends React.Component {

  user = {
    userId: '65bce7916e102aee72e6706a',
    userName: "Alok Kumar Singh"
  };
  
  users = [
    {
        userId: '65bce7916e102aee72e6706a',
        userName: 'Alok Kumar Singh'
    },
    {
        userId: '65bd004222aa8c35198c22be',
        userName: 'Rashi Vishwakarma'
    }
  ];

  render() {
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
}

export default MainContainer;