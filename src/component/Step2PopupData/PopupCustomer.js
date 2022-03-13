import PopupAddContact from '../Step3PopupAdd/PopupAddContact';
import PopupAddAddress from '../Step3PopupAdd/PopupAddAddress';
import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { closeCustomerModal } from '../../redux/actions'


function PopupCustomer() {

    // ------- redux store ------
    const stateCustomerModal = useSelector(state => state.modals.customer)
    const userData = useSelector(state => state.user.data)
    const dispatch = useDispatch();
    const contact = useSelector(state => state.masterDatas.contact)
    const address  = useSelector(state => state.masterDatas.address)
    // ------- redux store ------

    const navigate = useNavigate();

    // ------- Local state -------
    const [ lastCustomer, setLastCustomer  ] = useState(null)
    const [ childID, setChildID ] = useState(null)
    // ------- Local state -------

    const getSelectedContactID = (id) => {
        setChildID(id)
    }

    const getSelectedAddressID = (id) => {
        setChildID(id)
    }
    console.log('new Added contactID', lastCustomer)
    console.log('childID', childID)
    //-------- Function validated  ------------
    const [validated, setValidated] = useState(false);

    const validatedSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };

    
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

    const handleCloseModal = () => {
        dispatch(closeCustomerModal())
        setLastCustomer(null)
        setCustomerType('')
        setCustomerName('')
        setCustomerPhone('')
        setCustomerEmail('')
        setCustomerFAX('')
    }


    const handleRelationSubmit = async () => {
        // console.log('bind', lastContact.IdMasterData)
        try {
            //addID no
            const res
             = await axios.post('http://localhost:5000/api/customer/bind', { conID:  childID, cusID: lastCustomer.IdMasterData}, { withCredentials: true })
            console.log(res)
            // filterRelationCustomer(childID)
        }catch(err) {
            console.log(err)
        }
    }

    const filterRelationCustomer = (id) => {
        return contact.filter(c => c.IdmasterData === id)
    }



    return (
        <>           
            <Modal
                size="xl"
                show={stateCustomerModal}
                onHide={() => dispatch(closeCustomerModal())}
                backdrop="static"
                keyboard={false}
                noValidate validated={validated} 
                onSubmit={validatedSubmit}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Customer Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                    { !lastCustomer ? <Form>
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
                                    <Form.Control 
                                    type="CustomerName" 
                                    value={CustomerName} 
                                    onChange={(e) => setCustomerName(e.target.value)} 
                                    placeholder="Customer name"  
                                    required />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a Customer name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="EmailInput">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="Email" value={CustomerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Email"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="PhoneInput">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="Phone" value={CustomerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Phone" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="FAXInput">
                                    <Form.Label>FAX</Form.Label>
                                    <Form.Control type="FAX" value={CustomerFAX} onChange={(e) => setCustomerFAX(e.target.value)} placeholder="FAX" />
                                </Form.Group>
                            </Row>
                            <Button variant="success" size="sm"  type="submit"onClick={handleSubmit}>Save</Button>
                    </Form> :
                         <>
                            <small>ID: {lastCustomer.IdMasterData}</small>
                            <h1>{lastCustomer.Name}</h1>
                            <h4>Phone: {lastCustomer.Phone}</h4>
                            <h4>Email: {lastCustomer.Email}</h4>
                            <h4>FAX: {lastCustomer.FAX}</h4>
                        </>
                    }

                    </div>
                        
                        
                        <PopupAddAddress isAddedCustomer={lastCustomer} getSelectedAddressID={getSelectedAddressID} />
                    
                        <br/><br/>
                        
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

                        <PopupAddContact isAddedCustomer={lastCustomer} getSelectedContactID={getSelectedContactID} />
                    
                        <br/><br/>

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
                        
                   
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="success" size="sm" onClick={handleRelationSubmit} >
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => dispatch(closeCustomerModal())} size="sm">
                        Close
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupCustomer;

