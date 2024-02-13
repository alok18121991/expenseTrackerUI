import React from 'react';
import { Link } from "react-router-dom";
import { Container,Navbar, Nav } from 'react-bootstrap';
import {PlusCircle, HouseFill, ArrowLeftRight, GearFill, BarChartFill} from 'react-bootstrap-icons';


class FooterMenu extends React.Component{
    render(){
        return (
            <Navbar>
                <Container fluid>
                  <Nav className="m-auto">
                    <Nav.Link>
                      <Link to={`/`}><HouseFill color="white" size={30} /></Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to={`expense/history`}><ArrowLeftRight color="white" size={30} /></Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to={`expense/add`}><PlusCircle color="white" size={50} /></Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to={`expense/add`}><BarChartFill color="white" size={30} /></Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to={`/`}><GearFill color="white" size={30} /></Link>
                    </Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
        )
    }
}

export default FooterMenu;