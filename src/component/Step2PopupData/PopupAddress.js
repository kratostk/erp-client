import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { closeAddressModal } from '../../redux/actions'
import PopupAddCustomer from '../Step3PopupAdd/PopupAddCustomer';
import { addAddress } from '../../redux/address/asyncActions'

function PopupAddress() {
     // ******************************* REDUX STORE *******************************\\
     const dispatch = useDispatch();
     const stateAddressModal = useSelector(state => state.modals.modals.address)
     const userData = useSelector(state => state.user.user.data)
     const customers = useSelector(state => state.customers.customers.data)    
     // ******************************* REDUX STORE *******************************\\
 

     // ******************************* LOCAL STATES *******************************\\
     const [ latestAddress, setLatestAddress ] = useState(null)
     const [ childID, setChildID ] = useState(null)
     console.log( 'latest address' ,latestAddress)

     const [AddressType, setAddressType] = useState('');
    const [AddressName, setAddressName] = useState('');
    const [AddressDescription, setAddressDescription] = useState('');
    const [AddressNumber, setAddressNumber] = useState('');
    const [AddressBuilding, setAddressBuilding] = useState('');   
    const [AddressSubDistrict, setAddressSubDistrict] = useState('');
    const [AddressDistrict, setAddressDistrict] = useState('');
    const [AddressProvince, setAddressProvince] = useState('');
    const [AddressPostalCode, setAddressPostalCode] = useState('');
     // ******************************* LOCAL STATES *******************************\\

     const getSelectedCustomerID = (id) => {
        setChildID(id)
    }
    

    const handleSubmit = async function (e) {
        console.log('ho')
        e.preventDefault();
        const addressData = {
            AddressType: AddressType,
            AddressName: AddressName,
            AddressDescription: AddressDescription,
            AddressNumber: AddressNumber,
            AddressBuilding: AddressBuilding,
            AddressSubDistrict: AddressSubDistrict,
            AddressDistrict: AddressDistrict,           
            AddressProvince: AddressProvince,
            AddressPostalCode: AddressPostalCode,
            user : userData
        };       
        try {
            dispatch(addAddress(addressData))
            .then(address => {
                setLatestAddress(address)
                console.log('hi')
            })
 
        }catch(err) {
            console.log(err)
        }
    };

    const handleCloseModal = () => {
        dispatch({type: 'CLOSE_ADD', payload: false})
        setLatestAddress(null)
        setAddressType('')
        setAddressName('')
        setAddressDescription('')
        setAddressNumber('')
        setAddressBuilding('')
        setAddressSubDistrict('')
        setAddressDistrict('')
        setAddressProvince('')
        setAddressPostalCode('')
    }

    const handleRelationSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/address/bind', { cusID:  childID, addID: latestAddress.IdMasterData}, { withCredentials: true })
            // filterRelationCustomer(childID)
        }catch(err) {
            console.log(err)
        }
    }

    const filterRelationCustomer = (id) => {
        return customers.filter(c => c.IdmasterData === id)
    }


   

    return (
        <>           
            <Modal
                size="xl"
                show={stateAddressModal}
                onHide={() => dispatch({ type: 'CLOSE_ADD' })}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Address Detail</Modal.Title>                   
                </Modal.Header>
                <Modal.Body>
                    <div >
                    { !latestAddress ? <Form>                           
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressTypeDropdown">
                                    <Form.Label>Address type</Form.Label>
                                    <Form.Select defaultValue="Please select Address type" value={AddressType} onChange={(e) => setAddressType(e.target.value)}>
                                        <option>Please select Address type</option>
                                        <option value='public'>Public</option>
                                        <option value='personal'>Personal</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="AddressNameInput">
                                    <Form.Label>Address name</Form.Label>
                                    <Form.Control 
                                        type="AddressName" 
                                        value={AddressName} 
                                        onChange={(e) => setAddressName(e.target.value)} 
                                        placeholder="Address name"  />
                                </Form.Group>

                                <Form.Group as={Col} controlId="DescriptionInput">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                        type="Description" 
                                        value={AddressDescription} 
                                        onChange={(e) => setAddressDescription(e.target.value)} 
                                        placeholder="Description" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressNumberInput">
                                    <Form.Label>Address number</Form.Label>
                                    <Form.Control 
                                        type="AddressNumber" 
                                        value={AddressNumber} 
                                        onChange={(e) => setAddressNumber(e.target.value)} 
                                        placeholder="Address number" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="BuildingInput">
                                    <Form.Label>Building</Form.Label>
                                    <Form.Control 
                                        type="Building" 
                                        value={AddressBuilding} 
                                        onChange={(e) => setAddressBuilding(e.target.value)} 
                                        placeholder="Building" />
                                </Form.Group>                                
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="SubDistrictInput">
                                    <Form.Label>SubDistrict</Form.Label>
                                    <Form.Control 
                                        type="SubDistrict" 
                                        value={AddressSubDistrict} 
                                        onChange={(e) => setAddressSubDistrict(e.target.value)} 
                                        placeholder="SubDistrict" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="DistrictInput">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control 
                                        type="District" 
                                        value={AddressDistrict} 
                                        onChange={(e) => setAddressDistrict(e.target.value)} 
                                        placeholder="District" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="ProvinceInput">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control 
                                        type="Province" 
                                        value={AddressProvince} 
                                        onChange={(e) => setAddressProvince(e.target.value)} 
                                        placeholder="Province" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="PostalCodeInput">
                                    <Form.Label>PostalCode</Form.Label>
                                    <Form.Control 
                                        type="PostalCode" 
                                        value={AddressPostalCode} 
                                        onChange={(e) => setAddressPostalCode(e.target.value)} 
                                        placeholder="PostalCode" />
                                </Form.Group>
                            </Row>
                            <Button variant="success" size="sm"  type="submit"onClick={ handleSubmit }>Save</Button>
                        </Form> :
                            <>
                                <small>ID: {latestAddress.IdMasterData}</small>
                                <Row>
                                    <Col><h1>Address name : {latestAddress.Name}</h1></Col>
                                    <Col><h4>Address type : {latestAddress.Type}</h4></Col>
                                    <Col><h4>Description: {latestAddress.Description}</h4></Col>
                                </Row>
                                <Row>
                                    <Col><h4>AddressNumber: {latestAddress.Number}</h4></Col>
                                    <Col><h4>Building: {latestAddress.Building}</h4></Col>
                                    <Col><h4>SubDistrict: {latestAddress.SubDistrict}</h4></Col>
                                </Row>
                                <Row>
                                    <Col><h4>District: {latestAddress.District}</h4></Col>
                                    <Col><h4>Province: {latestAddress.Province}</h4></Col>
                                    <Col><h4>PostalCode: {latestAddress.PostalCode}</h4></Col>
                                </Row>                                         
                            </>
                        }
                       
                    </div>
                        <PopupAddCustomer isAddedAddress={latestAddress} getSelectedCustomerID={getSelectedCustomerID} />
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
                    <Button variant="success" size="sm" onClick={handleRelationSubmit} >
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_ADD' })} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAddress;
