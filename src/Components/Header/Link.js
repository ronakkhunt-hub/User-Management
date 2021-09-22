import React from "react"
import { Link } from "react-router-dom";

const HeaderLink = () => {
    return (
        <div>
            <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="/login"><li>Login</li></Link>
                <Link to="/register"><li>Register</li></Link>
                <Link to="/user"><li>User</li></Link>
                <Link to="/contact"><li>Contact</li></Link>
            </ul>
        </div>
    )
}

export default HeaderLink;