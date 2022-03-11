/*import './MenuBar.css';*/
import React from 'react';
import MasterCustomer from './Step1Master/MasterCustomer';
import MasterContact from './Step1Master/MasterContact';
import MasterAddress from './Step1Master/MasterAddress';
import PopupCustomer from './Step2PopupData/PopupCustomer';
import PopupContact from './Step2PopupData/PopupContact';
import PopupAddress from './Step2PopupData/PopupAddress';
import { Container, Row, Col, Tab, Nav, Placeholder } from 'react-bootstrap'
import { BsFillPersonBadgeFill } from "react-icons/bs";

function MenuBar() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={2} >
                    <Nav variant="pills" className="flex-column" >
                        <Nav.Item >
                            <Nav.Link eventKey="MasterCustomer">Master Customer</Nav.Link><hr />
                        </Nav.Item>
                        
                        <Nav.Item class="bg-info text-white">
                            <Nav.Link eventKey="MasterContact"><BsFillPersonBadgeFill size="1.5em"/>          Master Contact</Nav.Link>
                        </Nav.Item>
                            <hr/>
                        <Nav.Item class="bg-info text-white">
                            <Nav.Link eventKey="MasterAddress">Master Address</Nav.Link>
                        </Nav.Item>
                                <hr/>
                    </Nav>
                </Col>
                <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="MasterCustomer">
                            <PopupCustomer />
                            <br />
                            <MasterCustomer />
                        </Tab.Pane>
                        <Tab.Pane eventKey="MasterContact">
                            <PopupContact />
                            <br />
                            <MasterContact />
                        </Tab.Pane>
                        <Tab.Pane eventKey="MasterAddress">
                            <PopupAddress />
                            <br />
                            <MasterAddress />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default MenuBar;