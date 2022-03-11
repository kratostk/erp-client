import './App.css';
import Login from './views/Login';
import Layout from './component/Layout';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; // :)
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GuardedRoute from './views/GuardedRoute'
import { useSelector } from 'react-redux'
import axios from 'axios'
// import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { authenticated, unauthenticated } from './redux/actions'

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path='/' element={<GuardedRoute/>}>
                        <Route path="/" element={<Layout />} /> 
                    </Route>
                    {/* <GuardedRoute path="/" element={<Layout/>} auth={false}/> */}
                    
                </Routes>
            </BrowserRouter>
            
            
        </div>
  );
}

export default App;
