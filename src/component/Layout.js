import Header from './Header';
//import Login from '../views/Login';
import React from 'react';
import MenuBar from './MenuBar';
import MasterCustomer from './Step1Master/MasterCustomer';
import MasterContact from './Step1Master/MasterContact';
import MasterAddress from './Step1Master/MasterAddress';
import PopupCustomer from './Step2PopupData/PopupCustomer';
import PopupContact from './Step2PopupData/PopupContact';
import PopupAddress from './Step2PopupData/PopupAddress';
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; // :)
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { authenticated, unauthenticated } from '../redux/actions'



function Layout() {

    return (
        <div className="App">
            <Header />
            <MenuBar />           
        </div>
    );
}

export default Layout;
