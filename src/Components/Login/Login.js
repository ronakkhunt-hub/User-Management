import React, { useState } from 'react'
import { useHistory } from 'react-router';
import './Login.css'
import { Link, Redirect, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loginApi } from '../../utils/axiosApi';
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';


function isLogin() {
    if (localStorage.getItem('loggedIn')) {
        return true;
    }
    return false
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} component={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

const Login = ({ setTokenData }) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const login = await loginApi({
                url: 'auth/login-user',
            }, {
                email,
                password
            })
            if (login) {
                localStorage.setItem('loggedIn', login.data.token);
                setTokenData(login.data.token)
                toast('LoggedIn successfully');
                setTimeout(() => {
                    history.push("/");
                }, 5000);
            } else {
                toast('Invalid login credentials');
            }
        } catch (err) {
            toast('Invalid login credentials');
        }
    }

    return (
        <>
            <ToastContainer />
            <section>
                <div className="loginPage">
                    <div className="form">
                        <Form onSubmit={(e) => handleLogin(e)} autoComplete="off">
                            <Row className="justify-content-md-left">
                                <Col xs lg={12}>
                                    <h3 className="mt-5" >Login Form</h3>
                                    <InputGroup className="mt-3">
                                        <FormControl
                                            placeholder="Email"
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </InputGroup>
                                    <InputGroup className="mt-3">
                                        <FormControl
                                            placeholder="Password"
                                            aria-label="Password"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </InputGroup>

                                    <div className="mt-3 loginButton">
                                        <Button type="submit" id="buttonLogin" className="btn btn-primary">Submit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                        <div className="alreadyRegister">
                        Don't Have An Account? <Link to="/register">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;