import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, Table, Container } from 'react-bootstrap'
import PopupAddCustomer from '../Step3PopupAdd/PopupAddCustomer';

function PopupEditAddress() {
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
                    <Modal.Title>Address Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <Form>
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

export default PopupEditAddress;
