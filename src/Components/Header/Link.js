import React from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import './Header.css';

const HeaderLink = () => {
    
    function isLogin() {
        const sessionData = sessionStorage.getItem('key');
        const loginToken = JSON.parse(sessionData);
        if(loginToken && loginToken.data){
            return true;
        }
        return false
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Link className="homeLink" to="/">AmyleSoft</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link className="link" to="/">Home</Link></Nav.Link>
                        <Nav.Link><Link className="link" to="/register">Register</Link></Nav.Link>
                        <Nav.Link><Link className="link" to="/user">List</Link></Nav.Link>
                        <Nav.Link><Link className="link" to="/contact">Contact</Link></Nav.Link>
                        <NavDropdown className="link" title="Login">
                            <NavDropdown.Item className="link"><Link className="link" to="/login">User Login</Link></NavDropdown.Item>
                            <NavDropdown.Item className="link"><Link className="link" to="/admin-login">Admin Login</Link></NavDropdown.Item>
                        </NavDropdown>
                        {isLogin() ? <Nav.Link><Link className="link" to="/logout">Logout</Link></Nav.Link>: null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // <div>
        //     <ul>
        //         <Link to="/"><li>Home</li></Link>
        //         <Link to="/login"><li>Login</li></Link>
        //         <Link to="/register"><li>Register</li></Link>
        //         <Link to="/user"><li>User</li></Link>
        //         <Link to="/contact"><li>Contact</li></Link>
        //     </ul>
        // </div>
    )
}

export default HeaderLink;