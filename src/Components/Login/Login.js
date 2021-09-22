import React, { useState } from 'react'
import { useHistory } from 'react-router';
import './Login.css'
import { Redirect, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loginApi, validateUser } from '../../utils/axiosApi';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';


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
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        const user = await validateUser({
            url: 'api/getUser',
        }, {
            email,
            password
        });
        const userData = user.data.data;
        if (userData) {
            if (email !== userData.email && password !== userData.password) {
                toast('Invalid login credentials');
            } else {
                const login = await loginApi({
                    url: 'auth/login-user',
                }, {
                    email,
                    password
                })
                if (login) {
                    localStorage.setItem('loggedIn', login.data.token);
                    toast('LoggedIn successfully');
                    setTimeout(() => {
                        history.push("/");
                    }, 5000);
                }
            }
        } else {
            toast('Invalid login credentials');
        }
    }

    return (
        <>
            <ToastContainer />
            <Container>
                <Form onSubmit={(e) => handleLogin(e)} encType="multipart/form-data" autoComplete="off">
                    <Row className="justify-content-md-left">
                        <Col xs lg={4}>
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

                            <div className="mt-3">
                                <Button type="submit" className="btn btn-primary">Submit</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default Login;