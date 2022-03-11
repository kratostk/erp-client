import PopupAddContact from './PopupAddContact';
import PopupAddAddress from './PopupAddAddress';
import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";

function PopupEditCustomer() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>           
            <BsPencilSquare onClick={handleShow} />               

            <Modal
                size="xl"
                show={modal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Customer Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="CustomerTypeDropdown">
                                    <Form.Label>Customer type</Form.Label>
                                    <Form.Select defaultValue="Please select Customer type" type="CustomerType" value={CustomerType} onChange={(e) => setCustomerType(e.target.value)}>
                                        <option>Please select Customer type</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="CustomerNameInput">
                                    <Form.Label>Customer name</Form.Label>
                                    <Form.Control type="CustomerName" value={CustomerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="EmailInput">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="Email" placeholder="Email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="PhoneInput">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="Phone" placeholder="Phone" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="FAXInput">
                                    <Form.Label>FAX</Form.Label>
                                    <Form.Control type="FAX" placeholder="FAX" />
                                </Form.Group>
                            </Row>
                        </Form>

                        //Popup Add Address
                        <PopupAddAddress /> <br /><br />

                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Address type</th>
                                    <th>Address Name</th>
                                    <th>Description</th>
                                    <th>Address number</th>
                                    <th>Building</th>
                                    <th>Street</th>
                                    <th>SubDistrict</th>
                                    <th>District</th>
                                    <th>Province</th>
                                    <th>PostalCode</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>kratostracking</td>
                                    <td>Office</td>
                                    <td>kratos</td>
                                    <td>968</td>
                                    <td>ชั้น 5 อาคาร U-Chu Liang</td>
                                    <td>ถนนพระรามที่ ๔</td>
                                    <td>สีลม</td>
                                    <td>บางรัก</td>
                                    <td>กรุงเทพมหานคร</td>
                                    <td>10500</td>
                                </tr>
                            </tbody>
                        </Table>
                        <PopupAddContact />
                        <br /><br />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Contact Type</th>
                                    <th>Contact Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>FAX</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Sale</td>
                                    <td>Phobdaw</td>
                                    <td>ABC@gmail.com</td>
                                    <td>0981234567</td>
                                    <td>1234567890</td>
                                </tr>
                            </tbody>
                        </Table>

                    </div >
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

export default PopupEditCustomer;

