import PopupAddContact from '../Step3PopupAdd/PopupAddContact';
import PopupAddAddress from '../Step3PopupAdd/PopupAddAddress';
import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { closeCustomerModal } from '../../redux/actions'
import { addCustomer } from '../../redux/customer/asyncActions'
import { BsFillNutFill } from 'react-icons/bs';


function PopupCustomer() {

    // ********************************* REDUX STORE ******************************\\
    const stateCustomerModal = useSelector(state => state.modals.modals.customer)
    const userData = useSelector(state => state.user.user.data)
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts.data)
    const addresses  = useSelector(state => state.addresses.addresses.data)
    // ********************************* REDUX STORE ******************************\\



    // ********************************* LOCAL STATES ******************************\\
    const [ lastCustomer, setLastCustomer  ] = useState(null)
    const [ childID, setChildID ] = useState({
        isBusy: false,
        target: null,
        data: null
    })
    const [ busyState, setBusyState ] = useState(false) // we will keep track if customer already in stage of pending adding customer relation to any master data, two at the same time not allow

    //--------------------
    const [CustomerType, setCustomerType] = useState(null);
    const [CustomerName, setCustomerName] = useState('');
    const [CustomerPhone, setCustomerPhone] = useState('');
    const [CustomerEmail, setCustomerEmail] = useState('');
    const [CustomerFAX, setCustomerFAX] = useState('');
    // ********************************* LOCAL STATES ******************************\\

    const getSelectedContactID = (id) => {
        setChildID({
            isBusy: true,
            target: 'contact',
            data: id
        })
    }

    const getSelectedAddressID = (id) => {
        setChildID({
            isBusy: true,
            target: 'address',
            data: id
        })
    }

    //-------- Function validated  ------------
    // const [validated, setValidated] = useState(false);

    // const validatedSubmit = (event) => {
    //   const form = event.currentTarget;
    //   if (form.checkValidity() === false) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //   }
  
    //   setValidated(true);
    // };

    

    const handleAddCustomer = async function (e) {
        e.preventDefault();
        const customerData = {
            CustomerType : CustomerType,
            CustomerName : CustomerName,
            CustomerPhone : CustomerPhone,
            CustomerEmail : CustomerEmail,
            CustomerFAX : CustomerFAX,
            user : userData
        };
        try {
            dispatch(addCustomer(customerData))
            .then(data => {
                setLastCustomer(data)
                console.log(data)
            })
            .catch(err => {
                console.error(err)
            })
        }catch(err) {
            console.log(err)
        }
    };

    const handleCloseModal = () => {
        dispatch({type: 'CLOSE_CUS', payload: false})
        setLastCustomer(null)
        setCustomerType('')
        setCustomerName('')
        setCustomerPhone('')
        setCustomerEmail('')
        setCustomerFAX('')
    }


    const handleRelationSubmit = async () => {
        try {
            //addID no
            const res
             = await axios.post('http://localhost:5000/api/customer/bind', { conID:  childID, cusID: lastCustomer.IdMasterData}, { withCredentials: true })
            // filterRelationCustomer(childID)
        }catch(err) {
            console.log(err)
        }
    }

    const renderSelectedChildData = (childData) => {
        // const f = customers.filter(c => c.IdMasterData == id)

        if(childID.isBusy && childID.target === 'address') {
            const f = addresses.filter(c => c.IdMasterData == childData.data)
            return f.map((n, i) => (
                <div key={i}>
                    <hr/>
                    <Button variant="danger" onClick={ () => setChildID({ isBusy: false, target: null, data: null }) } size="sm">Remove</Button>

                    <Row>
                        <h3>Selected Address</h3>
                    </Row>
                    <Row>
                        <small>Status : Pending</small>
                    </Row>
                    <Row>
                        <p>ID : <code>{n.IdMasterData}</code></p>
                    </Row>
                    <Row>
                        <Col><p>Customer type : <b>{n.Type}</b></p></Col>
                        <Col><p>Customer name : <b>{n.Name}</b></p></Col>
                    </Row>
                    <Row>
                        <Col><p>Phone : <b>{n.Phone}</b></p></Col>
                        <Col><p>Email : <b>{n.Email}</b></p></Col>
                        <Col><p>FAX : <b>{n.FAX}</b></p></Col>
                    </Row>       
                </div>
            ))
        }else if(childID.isBusy && childID.target === 'contact') {
            const f = contacts.filter(c => c.IdMasterData == childData.data)
            return f.map((n, i) => (
                <div key={i}>
                    <hr/>
                    <Button variant="danger" onClick={ () => setChildID({ isBusy: false, target: null, data: null }) } size="sm">Remove</Button>

                    <Row>
                        <h3>Selected Contact</h3>
                    </Row>
                    <Row>
                        <small>Status : Pending</small>
                    </Row>
                    <Row>
                        <p>ID : <code>{n.IdMasterData}</code></p>
                    </Row>
                    <Row>
                        <Col><p>Customer type : <b>{n.Type}</b></p></Col>
                        <Col><p>Customer name : <b>{n.Name}</b></p></Col>
                    </Row>
                    <Row>
                        <Col><p>Phone : <b>{n.Phone}</b></p></Col>
                        <Col><p>Email : <b>{n.Email}</b></p></Col>
                        <Col><p>FAX : <b>{n.FAX}</b></p></Col>
                    </Row>       
                </div>
            ))
        }else {
            return null
        }
    }

    const filterRelationCustomer = (id) => {
        return contacts.filter(c => c.IdmasterData === id)
    }

    console.log('childID', childID)

    return (
        <>           
            <Modal
                size="xl"
                show={stateCustomerModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Customer Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                    { !lastCustomer ? <Form onSubmit={handleAddCustomer}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="CustomerTypeDropdown">
                                    <Form.Label>Customer type</Form.Label>
                                    <Form.Select defaultValue="Please select Customer type" type="CustomerType" value={CustomerType} onChange={(e) => setCustomerType(e.target.value)}>
                                        <option>Please select Customer type</option>
                                        <option value='company'>Company</option>
                                        <option value='personal'>Personal</option>
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
                            <Button variant="success" size="sm"  type="submit">Save</Button>
                    </Form> :
                         (
                         <>
                            <small>ID : <code>{lastCustomer.IdMasterData}</code></small>
                            <p>Customer name :{lastCustomer.Company}</p>
                            <p>Phone : {lastCustomer.Phone}</p>
                            <p>Email : {lastCustomer.Email}</p>
                            <p>FAX : {lastCustomer.FAX}</p>  

                            

                            { renderSelectedChildData(childID) }           
                        </>
                        )
                    }

                    </div>
                        
                        
                        <PopupAddAddress isChildIDSet={childID.target} isAddedContact={lastCustomer} getSelectedAddressID={getSelectedAddressID} />
                    
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

                        <PopupAddContact isChildIDSet={childID.target} isAddedContact={lastCustomer} getSelectedContactID={getSelectedContactID} />
                    
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
                    
                    <Button disabled={!lastCustomer} variant="success" size="sm" onClick={handleRelationSubmit} >
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal} size="sm">
                        Close
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupCustomer;

