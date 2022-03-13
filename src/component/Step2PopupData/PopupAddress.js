import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { closeAddressModal } from '../../redux/actions'
import PopupAddCustomer from '../Step3PopupAdd/PopupAddCustomer';

function PopupAddress() {
     // ------- redux store ------
     const stateAddressModal = useSelector(state => state.modals.address)
     const userData = useSelector(state => state.user.data)
     const dispatch = useDispatch();
     const customers = useSelector(state => state.masterDatas.customer)    
     // ------- redux store ------
 
     const navigate = useNavigate();

     // ------- Local state -------
     const [ lastAddress, setLastAddress ] = useState(null)
     const [ childID, setChildID ] = useState(null)
     // ------- Local state -------

     const getSelectedCustomerID = (id) => {
        setChildID(id)
    }
    console.log('new Added addressID', lastAddress)
    console.log('childID', childID)

      //-------- Post request contact ------------
    const [AddressType, setAddressType] = useState('');
    const [AddressName, setAddressName] = useState('');
    const [AddressDescription, setAddressDescription] = useState('');
    const [AddressNumber, setAddressNumber] = useState('');
    const [AddressBuilding, setAddressBuilding] = useState('');   
    const [AddressSubDistrict, setAddressSubDistrict] = useState('');
    const [AddressDistrict, setAddressDistrict] = useState('');
    const [AddressProvince, setAddressProvince] = useState('');
    const [AddressPostalCode, setAddressPostalCode] = useState('');

    const handleSubmit = async function (e) {
        console.log('hit submit Address')
        alert('hi')
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
            const res = await axios.post('http://localhost:5000/api/address', addressData, { withCredentials: true })
            const { output_id } = res.data.data;
            const updateAddressConstants = {
                Name: addressData.AddressName,
                Type: addressData.AddressType,
                Description: addressData.AddressDescription,
                Number: addressData.AddressNumber,
                Building: addressData.AddressBuilding,
                SubDistrict: addressData.AddressSubDistrict,
                District: addressData.AddressDistrict,
                Province: addressData.AddressProvince,
                PostalCode: addressData.AddressPostalCode,
                IdMasterData: output_id
            }
            setLastAddress(updateAddressConstants)
            console.log(res)
            dispatch({type: 'UPDATE_ADDRESS', payload: updateAddressConstants}) 
        }catch(err) {
            console.log(err)
        }
    };

    const handleCloseModal = () => {
        dispatch(closeAddressModal())
        setLastAddress(null)
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
        // console.log('bind', lastContact.IdMasterData)
        try {
            const res = await axios.post('http://localhost:5000/api/address/bind', { cusID:  childID, addID: lastAddress.IdMasterData}, { withCredentials: true })
            console.log(res)
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
                onHide={() => dispatch(closeAddressModal())}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Address Detail</Modal.Title>                   
                </Modal.Header>
                <Modal.Body>
                    <div >
                    { !lastAddress ? <Form>                           
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
                            <Button variant="success" size="sm"  type="submit"onClick={handleSubmit}>Save</Button>
                        </Form> :
                            <>
                                <small>ID: {lastAddress.IdMasterData}</small>
                                <h1>{lastAddress.Name}</h1>
                                <h4>Phone: {lastAddress.Type}</h4>
                                <h4>Description: {lastAddress.Description}</h4>
                                <h4>AddressNumber: {lastAddress.Number}</h4>
                                <h4>Building: {lastAddress.Building}</h4>
                                <h4>SubDistrict: {lastAddress.SubDistrict}</h4>
                                <h4>District: {lastAddress.District}</h4>
                                <h4>Province: {lastAddress.Province}</h4>
                                <h4>PostalCode: {lastAddress.PostalCode}</h4>
                            </>
                        }
                       
                    </div>
                        <PopupAddCustomer isAddedAddress={lastAddress} getSelectedCustomerID={getSelectedCustomerID} />
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
                    <Button variant="secondary" onClick={() => dispatch(closeAddressModal())} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAddress;
