import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { closeAddressModal } from '../../redux/actions'
import PopupAddCustomer from '../Step3PopupAdd/PopupAddCustomer';

function PopupAddress() {
     // ------- redux store ------
     const stateAddressModal = useSelector(state => state.modals.address)
     const dispatch = useDispatch();
     // ------- redux store ------
 
     const navigate = useNavigate();

      //-------- Axios ------------
    const [AddressType, setAddressType] = useState('');
    const [AddressName, setAddressName] = useState('');
    const [AddressDescription, setAddressDescription] = useState('');
    const [AddressNumber, setAddressNumber] = useState('');
    const [AddressBuilding, setAddressBuilding] = useState('');
    const [AddressStreet, setAddressStreet] = useState('');
    const [AddressSubDistrict, setAddressSubDistrict] = useState('');
    const [AddressDistrict, setAddressDistrict] = useState('');
    const [AddressProvince, setAddressProvince] = useState('');
    const [AddressPostalCode, setAddressPostalCode] = useState('');

    const handleSubmit = function (e) {
        console.log('hit submit Address')
        alert('hi')
        e.preventDefault();
        const addressData = {
            AddressType: AddressType,
            AddressName: AddressName,
            AddressDescription: AddressDescription,
            AddressNumber: AddressNumber,
            AddressStreet: AddressStreet,
            AddressSubDistrict: AddressSubDistrict,
            AddressDistrict: AddressDistrict,           
            AddressProvince: AddressProvince,
            AddressPostalCode: AddressPostalCode
        };
        axios.post('http://localhost:5000/api/address', addressData, { withCredentials: true })
        .then((response) => { 
            console.log(response)              
        }).catch(err => console.log(err))
    };
   

    return (
        <>           
            <Modal
                size="xl"
                show={stateAddressModal}
                onHide={() => dispatch(closeAddressModal())}
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
                                    <Form.Select defaultValue="Please select Address type" value={AddressType} onChange={(e) => setAddressType(e.target.value)}>
                                        <option>Please select Address type</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="AddressNameInput">
                                    <Form.Label>Address name</Form.Label>
                                    <Form.Control type="AddressName" value={AddressName} onChange={(e) => setAddressName(e.target.value)} placeholder="Address name"  />
                                </Form.Group>

                                <Form.Group as={Col} controlId="DescriptionInput">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="Description" value={AddressDescription} onChange={(e) => setAddressDescription(e.target.value)} placeholder="Description" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressNumberInput">
                                    <Form.Label>Address number</Form.Label>
                                    <Form.Control type="AddressNumber" value={AddressNumber} onChange={(e) => setAddressNumber(e.target.value)} placeholder="Address number" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="BuildingInput">
                                    <Form.Label>Building</Form.Label>
                                    <Form.Control type="Building" value={AddressBuilding} onChange={(e) => setAddressBuilding(e.target.value)} placeholder="Building" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="StreetInput">
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control type="Street" value={AddressStreet} onChange={(e) => setAddressStreet(e.target.value)} placeholder="Street" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="SubDistrictInput">
                                    <Form.Label>SubDistrict</Form.Label>
                                    <Form.Control type="SubDistrict" value={AddressSubDistrict} onChange={(e) => setAddressSubDistrict(e.target.value)} placeholder="SubDistrict" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="DistrictInput">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control type="District" value={AddressDistrict} onChange={(e) => setAddressDistrict(e.target.value)} placeholder="District" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="ProvinceInput">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control type="Province" value={AddressProvince} onChange={(e) => setAddressProvince(e.target.value)} placeholder="Province" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="PostalCodeInput">
                                    <Form.Label>PostalCode</Form.Label>
                                    <Form.Control type="PostalCode" value={AddressPostalCode} onChange={(e) => setAddressPostalCode(e.target.value)} placeholder="PostalCode" />
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
                    <Button variant="success" onClick={handleSubmit} size="sm">Save</Button>
                    <Button variant="secondary" onClick={() => dispatch(closeAddressModal())} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAddress;
