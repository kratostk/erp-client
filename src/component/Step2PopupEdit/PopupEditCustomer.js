import PopupAddContact from '../Step3PopupAdd/PopupAddContact';
import PopupAddAddress from '../Step3PopupAdd/PopupAddAddress';
import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

function PopupEditCustomer() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // ------- redux store ------
    const stateCustomerModal = useSelector(state => state.modals.customer)
    const userData = useSelector(state => state.user.data)
    const dispatch = useDispatch();
    const contact = useSelector(state => state.contacts.contacts.data)
    const address  = useSelector(state => state.addresses.addresses.data)
    // ------- redux store ------

    const navigate = useNavigate();

    // ------- Local state -------
    const [ lastCustomer, setLastCustomer  ] = useState(null)
    const [ childID, setChildID ] = useState(null)
    // ------- Local state -------

    //-------- Post request Customer ------------
    const [CustomerType, setCustomerType] = useState(null);
    const [CustomerName, setCustomerName] = useState('');
    const [CustomerPhone, setCustomerPhone] = useState('');
    const [CustomerEmail, setCustomerEmail] = useState('');
    const [CustomerFAX, setCustomerFAX] = useState('');

    const handleSubmit = async function (e) {
        e.preventDefault();
        console.log('hi')
        const customerData = {
            CustomerType : CustomerType,
            CustomerName : CustomerName,
            CustomerPhone : CustomerPhone,
            CustomerEmail : CustomerEmail,
            CustomerFAX : CustomerFAX,
            user : userData
        };
        try {
            const res = await axios.post('http://localhost:5000/api/customer', customerData, { withCredentials: true })
            const { output_id } = res.data.data;
            const updateCustomerConstants = {
                Name: customerData.CustomerName,
                Type: customerData.CustomerType,
                Phone: customerData.CustomerPhone,
                Email: customerData.CustomerEmail,
                FAX: customerData.CustomerFAX,
                IdMasterData: output_id
            }
            setLastCustomer(updateCustomerConstants)
            console.log(res)
            dispatch({type: 'UPDATE_CUSTOMER', payload: updateCustomerConstants}) 
        }catch(err) {
            console.log(err)
        }
    };

    return (
        <>           
            <BsPencilSquare onClick={handleShow} />               

            <Modal
                size="xl"
                show={show}
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
                                    <Form.Select defaultValue="Please select Customer type" type="CustomerType" >
                                        <option>Please select Customer type</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="CustomerNameInput">
                                    <Form.Label>Customer name</Form.Label>
                                    <Form.Control type="CustomerName" placeholder="Customer name" />
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

