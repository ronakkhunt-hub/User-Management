import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core';

import './Login.css'
import { Redirect, Route } from 'react-router-dom';

const user = {
    email: 'ronakkhunt@gmail.com',
    password: '123456'
}

function isLogin() {
    if (localStorage.getItem('loggedIn')) {
        return true;
    }
    return false
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

const Login = () => {
    const [email, SetEmailData] = useState("");
    const [password, SetPasswordData] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        if (email !== user.email) {
            alert("Invalid Email");
        } else if (password !== user.password) {
            alert("Invalid Password");
        } else {
            localStorage.setItem('loggedIn', true);
            alert('login successfully')
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleLogin(e)} autoComplete="off">
                <div className="textField">
                    <h3>Login Form</h3>

                    <div className="emailField">
                        <TextField placeholder="Email" onChange={(e) => SetEmailData(e.target.value)} variant="outlined" required />
                    </div>

                    <div className="passwordField">
                        <TextField placeholder="Password" onChange={(e) => SetPasswordData(e.target.value)} variant="outlined" required />
                    </div>

                    <div className="button">
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login;