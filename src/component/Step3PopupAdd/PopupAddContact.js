import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row } from 'react-bootstrap'
import PopupCustomer from '../Step2PopupData/PopupCustomer';
import { useSelector } from 'react-redux'

function PopupAddContact() {
    // const masterPopupState = useSelector(state => state.popups[0])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div class="col float-end">
                <Button variant="success" onClick={handleShow} size="sm">
                    Add Contact
                </Button>
            </div>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Customer Name</Modal.Title>
                    <h3 >Contact Detail</h3>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="ContactDropdown">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Select defaultValue="Please select Contact">
                                        <option>Please select Contact</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
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
                                    <Form.Control type="ContactName" placeholder="Contact name" />
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="success" size="sm">Save hi</Button>
                    <Button variant="secondary" onClick={handleClose} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAddContact;

