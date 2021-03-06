import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import PopupAddCustomer from '../Step3PopupAdd/PopupAddCustomer';
import { BsPencilSquare } from "react-icons/bs";
import Axios from 'axios';
import { useSelector } from 'react-redux'


function PopupEditContact({ contactID }) {
    // -------- REDUX STORE -------------- ✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️
    const contacts = useSelector(state => state.contacts.contacts.data) // 👈👈👈👈👈👈👈👈👈👈👈👈👈
    // -------- REDUX STORE --------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderData = contacts.filter((item) => item.IdMasterData === contactID ? (
        <div className="contactmodal" key={item.IdMasterData} >
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="ContactTypeDropdown">
                        <Form.Label>Contact type</Form.Label>
                        <Form.Select defaultValue="Please select Customer type">
                            <option>Please select Contact type</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="ContactNameInput">
                        <Form.Label>Contact name</Form.Label>
                        <Form.Control type="ContactName" placeholder="Contact name" value={item.Name}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="EmailInput">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="Email" placeholder="Email" value={item.Email} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="PhoneInput">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="Phone" placeholder="Phone" value={item.Phone}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="FAXInput">
                        <Form.Label>FAX</Form.Label>
                        <Form.Control type="FAX" placeholder="FAX" value={item.FAX} />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    ) : null) 

    return (
        <>
            {/* <BsPencilSquare onClick={handleShow} /> */}

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderData}
                        {/*//Popup Add Customer*/}
                    <PopupAddCustomer />
                    <br /><br />

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer Type</th>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>FAX</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Pubic</td>
                                <td>ABC</td>
                                <td>ABC@gmail.com</td>
                                <td>0981234567</td>
                                <td>1234567890</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm">Export</Button>
                    <Button variant="success" size="sm">Save</Button>
                    <Button variant="secondary" onClick={handleClose} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupEditContact;

