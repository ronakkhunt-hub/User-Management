import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import './Header.css';

const HeaderLink = () => {

    function isLogin() {
        const sessionData = localStorage.getItem('loggedIn');
        if (sessionData) {
            return true;
        }
        return false
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container >
                    <div className="test">
                        <div>
                            <Navbar.Brand><Link className="homeLink" to="/">AmyleSoft</Link></Navbar.Brand>
                        </div>
                        <div>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-5">
                                    <Nav.Link><Link className="link" to="/">Home</Link></Nav.Link>
                                    <Nav.Link><Link className="link" to="/user">List</Link></Nav.Link>
                                    <Nav.Link><Link className="link" to="/contact">Contact</Link></Nav.Link>
                                    {isLogin() ? null : <Nav.Link><Link className="link" to="/login">Login</Link></Nav.Link>}
                                    {isLogin() ? <Nav.Link><Link className="link" to="/logout">Logout</Link></Nav.Link> : null}
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default HeaderLink;