import PopupAddCustomer from '../Step3PopupAdd/PopupAddCustomer';
import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Container } from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { closeContactModal } from '../../redux/actions'


function PopupContact() {
    // ------- redux store ------
    const stateContactModal = useSelector(state => state.modals.contact)
    const userData = useSelector(state => state.user.data)
    const dispatch = useDispatch();
    const customers = useSelector(state => state.masterDatas.customer)
    // ------- redux store ------

    const navigate = useNavigate();

    // ------- Local state -------
    const [ lastContact, setLastContact ] = useState(null)
    const [ childID, setChildID ] = useState(null)
    // ------- Local state -------

    const getSelectedCustomerID = (id) => {
        setChildID(id)
    }
    console.log('new Added contactID', lastContact)
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

    
    //-------- Post request contact ------------
    const [ContactType, setContactType] = useState(null);
    const [ContactName, setContactName] = useState('');
    const [ContactPhone, setContactPhone] = useState('');
    const [ContactEmail, setContactEmail] = useState('');
    const [ContactFAX, setContactFAX] = useState('');

    const handleSubmit = async function (e) {
        e.preventDefault();
        console.log('hi')
        const contactData = {
            ContactType : ContactType,
            ContactName : ContactName,
            ContactPhone : ContactPhone,
            ContactEmail : ContactEmail,
            ContactFAX : ContactFAX,
            user : userData
        };
        try {
            const res = await axios.post('http://localhost:5000/api/contact', contactData, { withCredentials: true })
            const { output_id } = res.data.data;
            const updateContactConstants = {
                Name: contactData.ContactName,
                Type: contactData.ContactType,
                Phone: contactData.ContactPhone,
                Email: contactData.ContactEmail,
                FAX: contactData.ContactFAX,
                IdMasterData: output_id
            }
            setLastContact(updateContactConstants)
            console.log(res)
            dispatch({type: 'UPDATE_CONTACT', payload: updateContactConstants}) 
        }catch(err) {
            console.log(err)
        }
    };

    const handleCloseModal = () => {
        dispatch(closeContactModal())
        setLastContact(null)
        setContactType('')
        setContactName('')
        setContactPhone('')
        setContactEmail('')
        setContactFAX('')
    }

    // TODO: must filter data accordingly to contact ID
    const renderData = customers ? customers.map((item, i) => {
        return(
            <tr key={i}>
                <td>{item.Id}</td>
                <td>{item.Type}</td>
                <td>{item.Company}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
            </tr>
        )
    }) : null
    
    
    return (
        <>  

            <Modal
                size="xl"
                show={stateContactModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Contact Detail</Modal.Title>                  
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
                    <Button variant="success" size="sm"  type="submit"onClick={handleSubmit}>Save</Button>
                </Form> :
                    <>
                        <small>ID: {lastContact.IdMasterData}</small>
                        <h1>{lastContact.Name}</h1>
                        <h4>Phone: {lastContact.Phone}</h4>
                        <h4>Email: {lastContact.Email}</h4>
                    </>
                }

                
            
            </div>
                    {/*//Popup Add Customer*/}
                    <PopupAddCustomer isAddedContact={lastContact} getSelectedCustomerID={getSelectedCustomerID} />
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
                            {/* { renderData } */}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>                    
                    <Button variant="success" size="sm" >Submit</Button>
                    <Button variant="secondary" onClick={handleCloseModal} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupContact;

