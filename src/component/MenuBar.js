/*import './MenuBar.css';*/
import React from 'react';
import MasterCustomer from './Step1Master/MasterCustomer';
import MasterContact from './Step1Master/MasterContact';
import MasterAddress from './Step1Master/MasterAddress';
import PopupCustomer from './Step2PopupData/PopupCustomer';
import PopupContact from './Step2PopupData/PopupContact';
import PopupAddress from './Step2PopupData/PopupAddress';
import { Container, Row, Col, Tabs, Tab, Nav, Placeholder } from 'react-bootstrap'
import { BsFillPersonBadgeFill, BsFillHouseFill, BsFillBriefcaseFill } from "react-icons/bs";

function MenuBar() {
    return (

        <Container>
            <Row>
                <Col>
                    <Tabs
                        defaultActiveKey="customer"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                        >
                        <Tab eventKey="customer" title="Customer">
                            <PopupCustomer />
                            <MasterCustomer/>
                        </Tab>
                        <Tab eventKey="contact" title="Contact">
                            <PopupContact />
                            <MasterContact/>
                        </Tab>
                        <Tab eventKey="address" title="Address">
                            <PopupAddress />    
                            <MasterAddress/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>


        // <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        //     <Row>
        //         <Col sm={2} >
        //             <Nav variant="pills" className="flex-column" >
        //                 <Nav.Item  class="bg-info text-white">
        //                     <Nav.Link eventKey="MasterCustomer"><BsFillBriefcaseFill size="1.0em"/>       Master Customer</Nav.Link>
        //                 </Nav.Item>
        //                 <hr />
        //                 <Nav.Item class="bg-info text-white">
        //                     <Nav.Link eventKey="MasterContact"><BsFillPersonBadgeFill size="1.0em"/>          Master Contact</Nav.Link>
        //                 </Nav.Item>
        //                 <hr/>
        //                 <Nav.Item class="bg-info text-white">
        //                     <Nav.Link eventKey="MasterAddress"><BsFillHouseFill size="1.0em"/>         Master Address</Nav.Link>
        //                 </Nav.Item>
        //                 <hr/>
        //             </Nav>
        //         </Col>
        //         <Col sm={10}>
        //             <Tab.Content>
        //                 <Tab.Pane eventKey="MasterCustomer">
        //                     <PopupCustomer />
        //                     <br />
        //                     <MasterCustomer />
        //                 </Tab.Pane>
        //                 <Tab.Pane eventKey="MasterContact">
        //                     <PopupContact />
        //                     <br />
        //                     <MasterContact />
        //                 </Tab.Pane>
        //                 <Tab.Pane eventKey="MasterAddress">
        //                     <PopupAddress />
        //                     <br />
        //                     <MasterAddress />
        //                 </Tab.Pane>
        //             </Tab.Content>
        //         </Col>
        //     </Row>
        // </Tab.Container>
    );
}

export default MenuBar;