import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../Home/Home';
import Login, { PrivateRoute } from '../Login/Login';
import Logout from '../Login/Logout';
import Register from '../Register/Register';
import SeprateUser from '../SeprateUser/SeprateUser';
import User from '../User/User';

import './Header.css';

const Header = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/register"><Register /></Route>
                    <PrivateRoute exact component={User} path="/user" />
                    <PrivateRoute exact component={SeprateUser} path="/user/:id" />
                    <PrivateRoute exact component={SeprateUser} path="/user/:id" />
                    <Route path="/contact"></Route>
                    <Route path="/logout" component={Logout}></Route>
                </Switch>
            </Router>
        </>
    )

}

export default Header;