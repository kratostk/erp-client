import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";

function PopupCustomer({ isChildIDSet, isAddedContact ,getSelectedCustomerID}) {
    const stateCustomerModal = useSelector(state => state.modals.customer)

    //-------- Redux store -----
    const customers = useSelector(state => state.masterDatas.customer)
    const dispatch = useDispatch()
    //-------- Redux store -----


    const [ checkboxState, setCheckboxState ] = useState(false)
    const [ spinnerState, setSpinnerState ] = useState(false)

    //-------- Modal ------------
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //-------- Axios ------------
    const [CustomerType, setCustomerType] = useState('');
    const [CustomerName, setCustomerName] = useState('');
    const [CustomerPhone, setCustomerPhone] = useState('');
    const [CustomerEmail, setCustomerEmail] = useState('');
    const [CustomerFAX, setCustomerFAX] = useState('');
    

    // ----- Handle Save button ------
    const handleSave = (e) => {
        e.preventDefault();
        
        // if use existing customer dont make request
        if(!checkboxState) {
            const customerData = {
                CustomerType: CustomerType,
                CustomerName: CustomerName,
                CustomerPhone: CustomerPhone,
                CustomerEmail: CustomerEmail,
                CustomerFAX: CustomerFAX
                
            };
            setSpinnerState(true)
            axios.post('http://localhost:5000/api/customer', customerData, { withCredentials: true })
            .then((response) => { 
                setSpinnerState(false) // stop loading animation
                console.log(response) 
                dispatch({type: 'UPDATE_CUSTOMER', payload: {
                    Type: customerData.CustomerType,
                    Name: customerData.CustomerName,
                    Phone: customerData.CustomerPhone,
                    Email: customerData.CustomerEmail,
                    FAX: customerData.CustomerFAX,
                    IdMasterData: response.data.data.output_id
                }}) // update local master customer data in redux store
                getSelectedCustomerID(response.data.data.output_id) // set just created row id to be used to reference in relation table
                handleClose()
            }).catch(err => {
                setSpinnerState(false)
                console.log(err)
            })
        }else {
            // just close the modal
            handleClose()
        }
    }

    const renderData = customers ? customers.map((item, i) => {
        return(
            <option key={i}>{item.Company}</option>            
        )
    }): null
    
    
    return (
        <>
            <div class="col float-end">
                <Button disabled={!isAddedContact} variant="success" onClick={handleShow} size="sm">
                    { isChildIDSet ? 'Switch Customer' : 'Add Customer'}
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
                    <Modal.Title>Add Customer</Modal.Title>
                    {/* <h3 >Customer Detail</h3> */}
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <Form>
                            <Row className="mb-3">
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label="From existing customer"
                                    onChange={(e) => setCheckboxState(e.target.checked)}
                                />
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="CustomerDropdown">
                                    <Form.Label>Customer</Form.Label>
                                    <Form.Select 
                                        onChange={(e) => getSelectedCustomerID(e.target.value)} 
                                        disabled={!checkboxState} 
                                        defaultValue="Please select Customer">
                                        {/* <option onSelect={(e) => console.log(e)}>Please select Customer</option> */}
                                        {/* { renderData } */}
                                        { customers && customers.map((item, i) => (
                                            <option value={item.IdMasterData} label={item.Company} key={i}/>
                                        ))}
                                    </Form.Select>
                                    
                                </Form.Group>
                            </Row>


                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="CustomerTypeDropdown">
                                    <Form.Label>Customer type</Form.Label>
                                    <Form.Select disabled={checkboxState} defaultValue="Please select Customer type">
                                        <option value="personal">Personal</option>
                                        <option value="company">Company</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="CustomerNameInput">
                                    <Form.Label>Customer name</Form.Label>
                                    <Form.Control 
                                        type="CustomerName" 
                                        required
                                        value={CustomerName} 
                                        onChange={(e) => setCustomerName(e.target.value)} 
                                        placeholder="Customer name" 
                                        disabled={checkboxState}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="EmailInput">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="Email" 
                                        required
                                        value={CustomerEmail} 
                                        onChange={(e) => setCustomerEmail(e.target.value)} 
                                        placeholder="Email" 
                                        disabled={checkboxState}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="PhoneInput">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control 
                                        disabled={checkboxState}
                                        type="Phone"
                                        required 
                                        value={CustomerPhone} 
                                        onChange={(e) => setCustomerPhone(e.target.value)} 
                                        placeholder="Phone" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="FAXInput">
                                    <Form.Label>FAX</Form.Label>
                                    <Form.Control 
                                        disabled={checkboxState}
                                        type="FAX" 
                                        required
                                        value={CustomerFAX} 
                                        onChange={(e) => setCustomerFAX(e.target.value)} 
                                        placeholder="FAX" />
                                </Form.Group>
                            </Row>
                        </Form>                                             
                    </div >
                </Modal.Body>
                <Modal.Footer>                    
                    <Button loading variant="success" size="sm" onClick={handleSave}>
                        {spinnerState ? (
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
                    
                    <Button variant="secondary" onClick={handleClose} closeButton size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupCustomer;

// JavaScript source code
