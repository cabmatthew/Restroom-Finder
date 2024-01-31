import React from "react";
import { Navbar} from 'react-bootstrap';
import myImage from "./Images/map.png";

export default function MyNavbar() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" padding="30px">
                <Navbar.Brand className="logo" href="#">
                    <img className="logo" src={myImage} alt="Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Brand className="name" href="#">Toilet Tracker</Navbar.Brand>
                {/* <Nav className="mr-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#">About</Nav.Link>
                    <Nav.Link href="#">Contact</Nav.Link>
                </Nav> */}
                </Navbar.Collapse>S
            </Navbar> 
        </div>
    );
};