import PopupAddContact from '../Step3PopupAdd/PopupAddContact';
import PopupAddAddress from '../Step3PopupAdd/PopupAddAddress';
import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container, Spinner } from 'react-bootstrap'
import axios from "axios";
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
    const customers = useSelector(state => state.customers.customers.data)
    const customerAddresses = useSelector(state => state.relationships.customerAddresses) // -> filter
    const customerContacts = useSelector(state => state.relationships.customerContacts) // -> filter
    // ********************************* REDUX STORE ******************************\\



    // ********************************* LOCAL STATES ******************************\\
    const [ lastCustomer, setLastCustomer  ] = useState(null)
    const [ childID, setChildID ] = useState({
        isBusy: false,
        target: null,
        data: null
    })
    const [ saveBtnSpinner, setSaveBtnSpinner ] = useState(false)
    const [ addressArr, setAddressArr ] = useState(null)
    const [ contactArr, setContactArr ] = useState(null)

    //--------------------
    const [CustomerType, setCustomerType] = useState(null);
    const [CustomerName, setCustomerName] = useState('');
    const [CustomerPhone, setCustomerPhone] = useState('');
    const [CustomerEmail, setCustomerEmail] = useState('');
    const [CustomerFAX, setCustomerFAX] = useState('');
    // ********************************* LOCAL STATES ******************************\\


    // ********************************* PASS TO CHILD COMPONENTS FUNCTIONS ****************************\\
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
    // ********************************* PASS TO CHILD COMPONENTS FUNCTIONS ****************************\\

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

    
    // ********************************* MODAL HANDLING FUNCTIONS ****************************\\
    const handleCloseModal = () => {
        dispatch({type: 'CLOSE_CUS', payload: false})
        setLastCustomer(null)
        setCustomerType('')
        setCustomerName('')
        setCustomerPhone('')
        setCustomerEmail('')
        setCustomerFAX('')
    }
    // ********************************* MODAL HANDLING FUNCTIONS ****************************\\


    // ********************************* ADD CUSTOMER HANDLE ****************************\\
    const handleAddCustomer = async function (e) {
        e.preventDefault();
        setSaveBtnSpinner(true)
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
                setSaveBtnSpinner(false)
                console.log(data)
            })
            .catch(err => {
                console.error(err)
            })
        }catch(err) {
            console.log(err)
            setSaveBtnSpinner(false)
        }
    };
    // ********************************* ADD CUSTOMER HANDLE ****************************\\

    

    // ********************************* RELATION SUBMIT HANDLE ****************************\\
    const handleRelationSubmit = async () => {
        if(childID.isBusy && childID.target === 'address') {
            try {
                //addID no
                const res = await axios.post('http://localhost:5000/api/address/bind', { addID:  childID.data, cusID: lastCustomer.IdMasterData}, { withCredentials: true })
                 dispatch({ type: 'UPDATE_REL_ADDRESS_CUSTOMER', payload: { addID:  childID.data, cusID: lastCustomer.IdMasterData}})
                 setChildID({ isBusy: false, target: null, data: null }) // for hiding selected customer
            }catch(err) {
                console.log(err)
            }
        }else if (childID.isBusy && childID.target === 'contact') {
            try {
                //addID no
                const res = await axios.post('http://localhost:5000/api/contact/bind', { conID:  childID.data, cusID: lastCustomer.IdMasterData}, { withCredentials: true })
                dispatch({ type: 'UPDATE_REL_CONTACT_CUSTOMER', payload: { addID:  childID.data, cusID: lastCustomer.IdMasterData}})
                 setChildID({ isBusy: false, target: null, data: null }) // for hiding selected customer
            }catch(err) {
                console.log(err)
            }
        }else {
            return false
        }
        
    }
    // ********************************* RELATION SUBMIT HANDLE ****************************\\


    // ********************************* FILTER && CONDITIONAL RENDER SELECTED WHETHER ADDRESS || CONTACT ****************************\\
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
    // ********************************* FILTER && CONDITIONAL RENDER SELECTED WHETHER ADDRESS || CONTACT ****************************\\


    // ********************************* FILTER ADDRESS THAT HAVE RELATION WITH CUSTOMER OUT OF RELATION COLLECTION ****************************\\
    const filterRelationAddress = (customer_ID) => {
        if(!customer_ID) return null;

        const collectionOfTargetAddressID = customerAddresses.filter(item => item.cusID === customer_ID.IdMasterData)

        let res = []
        for(let i = 0; i < collectionOfTargetAddressID.length; i++) {
            for(let j = 0; j < addresses.length; j++) {
              if(collectionOfTargetAddressID[i].addID === addresses[j].IdMasterData){
                res.push(addresses[j])
              }
            }
        }
        
        setAddressArr(res)  
    }
    // ********************************* FILTER ADDRESS THAT HAVE RELATION WITH CUSTOMER OUT OF RELATION COLLECTION ****************************\\


    // ********************************* FILTER CONTACT THAT HAVE RELATION WITH CUSTOMER OUT OF RELATION COLLECTION ****************************\\
    const filterRelationContact = (customer_ID) => {
        if(!customer_ID) return null;

        const collectionOfTargetContactID = customerContacts.filter(item => item.cusID === customer_ID.IdMasterData)

        let res = []
        for(let i = 0; i < collectionOfTargetContactID.length; i++) {
            for(let j = 0; j < contacts.length; j++) {
              if(collectionOfTargetContactID[i].addID === contacts[j].IdMasterData){
                res.push(contacts[j])
              }
            }
        }
        
        setContactArr(res)  
    }
    // ********************************* FILTER ADDRESS THAT HAVE RELATION WITH CUSTOMER OUT OF RELATION COLLECTION ****************************\\

    React.useEffect(() => {
        filterRelationAddress(lastCustomer)
        filterRelationContact(lastCustomer)
    }, [customerAddresses, customerContacts ,lastCustomer, childID])

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
                            <Button 
                                variant="success" size="sm"  type="submit"
                            >
                                {saveBtnSpinner ? (
                                    <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ): null}
                                Save
                            </Button>
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
                                    <th>SubDistrict</th>
                                    <th>District</th>
                                    <th>Province</th>
                                    <th>PostalCode</th>
                                </tr>
                            </thead>
                            <tbody>
                                { addressArr ? addressArr.map((item, i) => (
                                    <tr>
                                        <td>{i}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.Number}</td>
                                        <td>{item.Building}</td>
                                        <td>{item.SubDistrict}</td>
                                        <td>{item.District}</td>
                                        <td>{item.Province}</td>
                                        <td>{item.PostalCode}</td>
                                    </tr>
                                )): null }
                                
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
                                { contactArr ? contactArr.map((item, i) => (
                                    <tr>
                                        <td>{i}</td>
                                        <td>{ item.Type }</td>
                                        <td>{ item.Name }</td>
                                        <td>{ item.Email }</td>
                                        <td>{ item.Phone }</td>
                                        <td>{ item.FAX }</td>
                                    </tr>
                                )): null }
                                
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

