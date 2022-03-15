import PopupAddCustomer from '../Step3PopupAdd/PopupAddCustomer';
import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container, Alert, Card, Spinner } from 'react-bootstrap'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { closeContactModal } from '../../redux/actions'
import { addContact } from '../../redux/contact/asyncActions'


function PopupContact() {
    // *********************** REDUX STORE ***********************\\
    const dispatch = useDispatch();
    const stateContactModal = useSelector(state => state.modals.modals.contact)
    const userData = useSelector(state => state.user.user.data)
    const customers = useSelector(state => state.customers.customers.data)
    const customerContacts = useSelector(state => state.relationships.customerContacts) // -> filter
    // *********************** REDUX STORE ***********************\\


    // *********************** LOCAL STATES ***********************\\
    const [ lastContact, setLastContact ] = useState(null)
    const [ childID, setChildID ] = useState(null)
    const [ spinnerState, setSpinnerState ] = useState(false)
    const [ mockupRelationData, setMockupRelationData ] = useState([])
    const [ contactsArr, setContactsArr ] = useState([])
    //-------------------
    const [ContactType, setContactType] = useState(null);
    const [ContactName, setContactName] = useState('');
    const [ContactPhone, setContactPhone] = useState('');
    const [ContactEmail, setContactEmail] = useState('');
    const [ContactFAX, setContactFAX] = useState('');
    const [validated, setValidated] = useState(false);
    // *********************** LOCAL STATES ***********************\\

    const getSelectedCustomerID = (id) => {
        setChildID(id)
    }

    //************************** Validated && Popup handling Functions  **************************\\

    const validatedSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
    const handleCloseModal = () => {
        dispatch({type: 'CLOSE_CON', payload: false})
        setLastContact(null)
        setContactType('')
        setContactName('')
        setContactPhone('')
        setContactEmail('')
        setContactFAX('')
        setContactsArr([])
    }
    //************************** Validated && Popup handling Functions  **************************\\

    
    // ************************************* SUBMIT && FILTER HANDLING ***********************************\\
    const handleAddContact = async function (e) {
        e.preventDefault();
        const contactData = {
            ContactType : ContactType,
            ContactName : ContactName,
            ContactPhone : ContactPhone,
            ContactEmail : ContactEmail,
            ContactFAX : ContactFAX,
            user : userData
        };
        try {
            dispatch(addContact(contactData))
            .then(data => setLastContact(data)) // from promise 

        }catch(err) {
            console.log(err)
        }
    };

    const handleRelationSubmit = async () => {
        setSpinnerState(true)
        try {
            const res = await axios.post('http://localhost:5000/api/contact/bind', { cusID:  childID, conID: lastContact.IdMasterData}, { withCredentials: true })
            // TODO: we need nothing from server response but status so we can react accordingly
            // dispatch selected customerID to redux store of master data relationship 
            dispatch({ type: 'UPDATE_REL_CONTACT_CUSTOMER', payload: { cusID:  childID, conID: lastContact.IdMasterData}})
            setChildID(null) // for hiding selected customer
            setSpinnerState(false)     
        }catch(err) {
            console.log(err)
            setSpinnerState(false)  
        }
    }
    const renderSelectedCustomer = (id) => {
        const f = customers.filter(c => c.IdMasterData == id)

        return f.map((n, i) => (
            <div key={i}>
                <hr/>
                <h3>Selected Customer</h3>
                <small>Status: Pending</small>
                <p>ID: <code>{n.IdMasterData}</code></p>
                <p>Name: <b>{n.Company}</b></p>
                <p>Email: <b>{n.Email}</b></p>
            </div>
        ))
    }

    const filterRelationCustomer = (contact_ID) => {
        //1 filter contactID out of relationship collection
        if(!contact_ID) return null;

        const collectionOfTargetContactID = customerContacts.filter(item => item.conID === contact_ID.IdMasterData)
        // {conID: 0, cusID: 1},
        // {conID: 0, cusID: 2},
        // ...

        let res = []
        for(let i = 0; i < collectionOfTargetContactID.length; i++) {
            for(let j = 0; j < customers.length; j++) {
              if(collectionOfTargetContactID[i].cusID === customers[j].IdMasterData){
                res.push(customers[j])
                // setState
                // setContactsArr(prev => [...prev, customers[j]])
              }
            }
        }
        
        setContactsArr(res)  
    }

    // ************************************* SUBMIT && FILTER HANDLING ***********************************\\

    
    React.useEffect(() => {
        filterRelationCustomer(lastContact)
    }, [customerContacts, lastContact, childID])



    
    return (
        <>  

            <Modal
                size="xl"
                show={stateContactModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                className="alert-fixed"
            >
                
                <Modal.Header closeButton>
                    <Modal.Title className='modal-header'>Contact Detail</Modal.Title>                                  
                </Modal.Header>
                <Modal.Body>
                <div className="contactmodal" >

                { !lastContact ?  <Form noValidate validated={validated} onSubmit={validatedSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="ContactTypeDropdown">
                            <Form.Label>Contact type</Form.Label>
                            <Form.Select onChange={(e) => setContactType(e.target.value)} >
                                <option>Please select customer type</option>
                                <option value='customer'>Customer</option>
                                <option value='employee'>Employee</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="ContactNameInput">
                            <Form.Label>Contact name</Form.Label>
                            <Form.Control 
                                type="ContactName" 
                                placeholder="Contact name" 
                                value={ContactName} 
                                onChange={(e) => setContactName(e.target.value)} 
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Contact name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="EmailInput">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="Email" 
                                placeholder="Email" 
                                value={ContactEmail} 
                                onChange={(e) => setContactEmail(e.target.value)}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="PhoneInput">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control 
                                type="Phone" 
                                placeholder="Phone" 
                                value={ContactPhone} 
                                onChange={(e) => setContactPhone(e.target.value)}
                                pattern="\d{10}"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Phone.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="FAXInput">
                            <Form.Label>FAX</Form.Label>
                            <Form.Control 
                                type="FAX" 
                                placeholder="FAX" 
                                value={ContactFAX} 
                                onChange={(e) => setContactFAX(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid FAX.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button variant="success" size="sm"  type="submit"onClick={ handleAddContact }>Save</Button>
                </Form> :
                    <>
                        <small>ID: <code>{lastContact.IdMasterData}</code></small>
                        <h5>Name: <b>{lastContact.Name}</b></h5>
                        <p>Phone: {lastContact.Phone}</p>
                        <p>Email: {lastContact.Email}</p>

                        
                        {/* render selected customer :)*/}
                        { renderSelectedCustomer(childID) }
                        
                        
                    </>
                }

                
            
            </div>
                    {/*//Popup Add Customer*/}
                    <PopupAddCustomer isChildIDSet={childID} isAddedContact={lastContact} getSelectedCustomerID={getSelectedCustomerID} />
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
    
                            { contactsArr ? contactsArr.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.Id}</td>
                                    <td>{item.Type}</td>
                                    <td>{item.Company}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Phone}</td>
                                    <td>{item.FAX}</td>
                                </tr>
                            )): null}

                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>                    
                    <Button variant="success" size="sm" onClick={handleRelationSubmit} 
                    >
                        {spinnerState ? (
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        ): null}
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

export default PopupContact;

