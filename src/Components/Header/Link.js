import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import './Header.css';

const HeaderLink = () => {
    const [addClass, setAddClass] = useState("");
    const [toggleClass, setToggleClass] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = (e) => {
        const header = document.querySelector('nav');
        const scrollTop = window.scrollY;
        if (scrollTop >= 178) {
            setAddClass('sticky')
            header && header.classList.add('sticky')
        } else {
            setAddClass('')
            header && header.classList.remove('sticky');
        };
    }

    function isLogin() {
        const sessionData = localStorage.getItem('loggedIn');
        if (sessionData) {
            return true;
        }
        return false
    }

    const collapseHandler = () => {
        setToggleClass(!toggleClass)
    }

    return (
        <>
            <div className="header">
                <header>
                    <div className="headerItems">
                        <Link style={{ textDecoration: 'none', color: "#000" }} to="/"><h1 >Shopify</h1></Link>
                    </div>
                    <nav className={toggleClass ? 'navContainer sticky navHeight' : `navContainer ${addClass}`} id="toggle">
                        <ul>
                            <li><Link className="link" to="/">Home</Link> </li>
                            <li><Link className="link" to="/music">Music</Link></li>
                            <li><Link className="link" to="/contact">Contact</Link></li>
                            <li>{isLogin() ? null : <Link className="link" to="/login">Login</Link>}</li>
                            <li>{isLogin() ? <Link className="link" to="/logout">Logout</Link> : null}</li>
                        </ul>
                        <div onClick={collapseHandler}>
                            {
                                !toggleClass ?
                                    <i className="fas fa-2x fa-bars"></i>
                                    :
                                    <i className="fas fa-2x fa-multiply"></i>
                            }
                        </div>
                    </nav>
                </header>
            </div>
        </>
    )
}

export default HeaderLink;