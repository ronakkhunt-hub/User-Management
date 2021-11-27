import React, { useState } from "react";
import { Col, Button, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import './Register.css'
import { registerApi } from "../../utils/axiosApi";

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [hobby, setHobby] = useState("");
    const [profile, setProfile] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    function generateRandomPassword() {
        const rand = ['1234567890', 'QWERTYUIOPASDFGHJKLZXCVBNM'];
        let passwordResult = '';
        for (const r of rand) {
            for (let i = 0; i < 3; i++) {
                passwordResult += r[Math.floor(Math.random() * r.length)];
            }
        }
        setPassword(passwordResult)
    }

    async function handleRegister(e) {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('email', email)
            formData.append('profile', profile)
            formData.append('description', description)
            formData.append('hobby', hobby)
            formData.append('password', password)
            const register = await registerApi({
                url: 'auth/register-user',
            }, formData
            );
            if (register) {
                toast('Register successfully')
                setTimeout(() => {
                    history.push('/login');
                }, 5000)
            }
        } catch (err) {
            console.log(`err`, err)
        }
    }

    return (
        <>
            <ToastContainer />
            <section>
                <div className="registerPage">
                    <div className="form">
                        <h1 className="mt-4 text-center">Register Page</h1>
                        <Form onSubmit={(e) => handleRegister(e)} return="false" autoComplete="off" encType="multipart/form-data">
                            <Row className="justify-content-md-left">
                                <Col xs lg={12}>
                                    <InputGroup className="mt-3">
                                        <FormControl
                                            name="firstname"
                                            placeholder="Firstname"
                                            aria-label="Firstname"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </InputGroup>

                                    <InputGroup className="mt-3">
                                        <FormControl
                                            name="lastname"
                                            placeholder="Lastname"
                                            aria-label="Lastname"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </InputGroup>

                                    <InputGroup className="mt-3">
                                        <FormControl
                                            name="email"
                                            placeholder="Email"
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setEmail(e.target.value)}
                                        // required
                                        />
                                    </InputGroup>

                                    <InputGroup className="mt-3">
                                        <FormControl
                                            name="description"
                                            placeholder="Description"
                                            aria-label="Description"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </InputGroup>

                                    <InputGroup className="mt-3">
                                        <FormControl
                                            name="hobby"
                                            placeholder="Hobby"
                                            aria-label="Hobby"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setHobby(e.target.value)}
                                        />
                                    </InputGroup>

                                    <Form.Group className="mt-3" controlId="formFile">
                                        <Form.Control name="profile" onChange={(e) => setProfile(e.target.files[0])} type="file" />
                                    </Form.Group>

                                    <div className="passwordField">
                                        <div className="generatePassword">
                                            <p onClick={generateRandomPassword}>generate password</p>
                                        </div>
                                        <InputGroup className="mt-3">
                                            <FormControl
                                                name="password"
                                                value={password}
                                                placeholder="Password"
                                                aria-label="Password"
                                                aria-describedby="basic-addon1"
                                                onChange={(e) => setPassword(e.target.value)}
                                            // required
                                            />
                                        </InputGroup>
                                    </div>

                                    <div className="registerButton">
                                        <Button type="submit" id="submitButton" className="btn btn-primary">Submit</Button>
                                        <Button type="reset" id="cancelButton" className="btn btn-danger">Cancel</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="alreadyAccount">
                        Aleady Have An Account? <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register