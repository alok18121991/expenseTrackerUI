import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { PlusCircleFill, House, ArrowLeftRight, Gear, BarChart } from 'react-bootstrap-icons';
import "./footerMenu.css";


class FooterMenu extends React.Component {
    render() {
        return (
            <Navbar>
                    <Nav className="m-auto footer-nav">
                        <Link className="nav-link" to={`/`}><House color="grey" size={30} /></Link>
                        <Link className="nav-link" to={`/history`}><ArrowLeftRight color="grey" size={30} /></Link>
                        <Link className="nav-link" to={`/add`}><PlusCircleFill color="#2db9c9" size={50} /></Link>
                        <Link className="nav-link" to={`/add`}><BarChart color="grey" size={30} /></Link>
                        <Link className="nav-link" to={`/`}><Gear color="grey" size={30} /></Link>
                    </Nav>
            </Navbar>
        )
    }
}

export default FooterMenu;