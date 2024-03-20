import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { PlusCircleFill, House, ArrowLeftRight, BarChart, People } from 'react-bootstrap-icons';
import "./footerMenu.css";


class FooterMenu extends React.Component {
    render() {
        return (
            <Navbar>
                    <Nav className="m-auto footer-nav">
                        <NavLink className="nav-link" to={`/`} style={this.setMenuStyle()}><House size={30} /></NavLink>
                        <NavLink className="nav-link" to={`/group`} style={this.setMenuStyle()}><People size={30} /></NavLink>
                        <NavLink className="nav-link" to={`/add`} style={this.setMenuStyle()}><PlusCircleFill size={50} /></NavLink>
                        <NavLink className="nav-link" to={`/history`} style={this.setMenuStyle()}><ArrowLeftRight size={30} /></NavLink>
                        <NavLink className="nav-link" to={`/stats`} style={this.setMenuStyle()}><BarChart size={30} /></NavLink>
                        {/* <NavLink className="nav-link" to={`/settings`}><Gear color="grey" size={30} /></NavLink> */}
                        
                    </Nav>
            </Navbar>
        )
    }

    setMenuStyle() {
        return ({ isActive, isPending, isTransitioning }) => {
            return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "#2db9c9" : "grey",
                viewTransitionName: isTransitioning ? "slide" : "",
            };
        };
    }
}

export default FooterMenu;