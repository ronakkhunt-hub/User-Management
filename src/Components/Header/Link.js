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
                            <Navbar.Brand><Link className="homeLink" to="/">Shopify</Link></Navbar.Brand>
                        </div>
                        <div>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-5">
                                    <Link className="link" to="/">Home</Link>
                                    {/* <Nav.Link><Link className="link" to="/user">List</Link></Nav.Link> */}
                                    <Link className="link" to="/contact">Contact</Link>
                                    {isLogin() ? null : <Link className="link" to="/login">Login</Link>}
                                    {isLogin() ? <Link className="link" to="/logout">Logout</Link> : null}
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