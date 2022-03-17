import React, { useState } from 'react';
import LoginLogo from '../IMG/LoginLogo.png';
import Logo from '../IMG/logo.png';
import '../App.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMsg from '../component/ErrorMsg';
import { useDispatch } from 'react-redux'
import { authenticated, unauthenticated } from '../redux/actions'
// import { authUser } from '../redux/asyncActions'



function Login() {
    const URL = "http://localhost:5000/login";
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState({
        isErr: false,
        text: null
    });



    const handleSubmit = function(e) {
        e.preventDefault();
        const userData = {
            username: username,
            password: password
        };
        axios.post(URL, userData, { withCredentials: true })
        .then((response) => {
            console.log('login', response.data);
            setErrMsg({isErr: false, text: null})
            dispatch(authenticated(response.data))
            navigate('/')
            
        }).catch((error) => {
            console.log(error.response)
            error.response ? setErrMsg({isErr: true, text: error.response.data.message}) : setErrMsg({isErr: false, text: null})
            dispatch(unauthenticated())
        });
    };
       
    
   
    return (
        <div >
            <Container fluid >
                <Row>
                    <Col sm={5}>
                        <img src={LoginLogo} className="LoginLogo" alt="logo"  />
                    </Col>
                    <Col sm={2}> </Col>
                    <Col sm={3}>
                        <Form onSubmit={handleSubmit}>
                            <br /><br />
                            <br /><br />
                            <img src={Logo} className="Logo" alt="logo" />
                            <div class="d-flex justify-content-center">
                                <h3>Log In</h3>
                            </div>
                            {errMsg.isErr ?
                                <div>
                                    <ErrorMsg msg={errMsg.text} />
                                </div> : null}
                            <label>User Name</label><br />
                            <input type="username" class="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter User name" />
                            
                            <br />                          
                          
                            <label>Password</label> <br />
                            <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                                                          
                            <br />
                            <div class="d-flex justify-content-center">
                                <Button type="submit" className="btn btn-success btn-block" onClick={handleSubmit} >Login</Button>
                            </div>
                        </Form>
                    </Col>                    
                </Row>
            </Container>
        </div>
    );
}

export default Login;