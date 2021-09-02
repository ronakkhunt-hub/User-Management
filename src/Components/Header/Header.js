import React from 'react'
import { Link, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import Home from '../Home/Home';
import Login, { PrivateRoute } from '../Login/Login';
import SeprateUser from '../SeprateUser/SeprateUser';
import User from '../User/User';
import './Header.css';

const Header = () => {
    const history = useHistory();
    console.log('history :>> ', history);
    return (
        <>
            <Router>
                <div style={1 ? { display: 'none' } : null}>
                    <ul>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/login"><li>Login</li></Link>
                        <Link to="/user"><li>User</li></Link>
                        <Link to="/contact"><li>Contact</li></Link>
                    </ul>
                </div>

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute component={User} path="/user" />
                    <Route path="/contact">
                        <center><h1>Contact Page</h1></center>
                    </Route>
                    <Route path="/:id">
                        <SeprateUser />
                    </Route>
                </Switch>
            </Router>
        </>
    )

}

export default Header;