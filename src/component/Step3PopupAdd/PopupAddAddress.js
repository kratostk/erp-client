import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'

function PopupAddAddress() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div class="col float-end">
                <Button variant="success" onClick={handleShow} size="sm">
                    Add Address
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
                    <Modal.Title>Customer name </Modal.Title>
                    <h3 >Address Detail</h3>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressDropdown">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Select defaultValue="Please select Address">
                                        <option>Please select Address</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressTypeDropdown">
                                    <Form.Label>Address type</Form.Label>
                                    <Form.Select defaultValue="Please select Address type">
                                        <option>Please select Address type</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="AddressNameInput">
                                    <Form.Label>Address name</Form.Label>
                                    <Form.Control type="AddressName" placeholder="Address name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="DescriptionInput">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="Description" placeholder="Description" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressNumberInput">
                                    <Form.Label>Address number</Form.Label>
                                    <Form.Control type="AddressNumber" placeholder="Address number" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="BuildingInput">
                                    <Form.Label>Building</Form.Label>
                                    <Form.Control type="Building" placeholder="Building" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="StreetInput">
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control type="Street" placeholder="Street" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="SubDistrictInput">
                                    <Form.Label>SubDistrict</Form.Label>
                                    <Form.Control type="SubDistrict" placeholder="SubDistrict" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="DistrictInput">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control type="District" placeholder="District" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="ProvinceInput">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control type="Province" placeholder="Province" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="PostalCodeInput">
                                    <Form.Label>PostalCode</Form.Label>
                                    <Form.Control type="PostalCode" placeholder="PostalCode" />
                                </Form.Group>
                            </Row>
                        </Form>
                    </div >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" size="sm">Save</Button>
                    <Button variant="secondary" onClick={handleClose} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAddAddress;

// JavaScript source code
