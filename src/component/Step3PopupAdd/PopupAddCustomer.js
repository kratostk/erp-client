import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addCustomer } from '../../redux/customer/asyncActions'

function PopupCustomer({ isChildIDSet, isAddedContact ,getSelectedCustomerID}) {
    const stateCustomerModal = useSelector(state => state.modals.modals.customer)

    //**************************** Redux store ****************************\\
    const customers = useSelector(state => state.customers.customers.data)
    const dispatch = useDispatch()
    //**************************** Redux store ****************************\\


    //**************************** LOCAL STATE *****************************\\
    const [ checkboxState, setCheckboxState ] = useState(false)
    const [ spinnerState, setSpinnerState ] = useState(false)
    const [ selectedCustomerID, setSelectedCustomerID ] = useState(null)
    //----------------------
    const [show, setShow] = useState(false);
    const [CustomerType, setCustomerType] = useState('');
    const [CustomerName, setCustomerName] = useState('');
    const [CustomerPhone, setCustomerPhone] = useState('');
    const [CustomerEmail, setCustomerEmail] = useState('');
    const [CustomerFAX, setCustomerFAX] = useState('');
    const [validated, setValidated] = useState(false);
    //**************************** LOCAL STATE *****************************\\

    //************************* Modal Handle Function *************************//
    const handleClose = () => {
        setCheckboxState(false)
        setShow(false)
    };
    const handleShow = () => setShow(true);
    //************************* Modal Handle Function *************************//

    // ************************* Save Function *************************//
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
            dispatch(addCustomer(customerData)) // <-- return promise
            .then(data => {
                setSpinnerState(false) // stop loading animation
                getSelectedCustomerID(data.IdMasterData) // set just created row id to be used to reference in relation table
                handleClose()
            })
            .catch(err => {
                setSpinnerState(false)
                console.log(err)
            })
        }else {
            // SELECT CUSTOMER FROM EXISTING DATA

            // set selected ID to setState of parent component
            getSelectedCustomerID(selectedCustomerID)
            handleClose()
        }
    }
    // ************************* Save Function *************************//

    
    
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
                                    value={checkboxState}
                                    type="switch"
                                    id="custom-switch"
                                    label="From existing customer"
                                    onChange={(e) => setCheckboxState(e.target.checked)}
                                />
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="CustomerDropdown">
                                    <Form.Label>Select Customers</Form.Label>
                                    <Form.Select 
                                        onChange={(e) => setSelectedCustomerID(e.target.value)} 
                                        disabled={!checkboxState} 
                                        defaultValue="Please select Customer">

                                        { customers && customers.map((item, i) => (
                                            <option value={item.IdMasterData} label={item.Company} key={i}/>
                                        ))}

                                    </Form.Select>
                                    
                                </Form.Group>
                            </Row>


                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="CustomerTypeDropdown">
                                    <Form.Label>Customer type</Form.Label>
                                    <Form.Select 
                                        onChange={(e) => setCustomerType(e.target.value)}
                                        disabled={checkboxState} 
                                        defaultValue="Please select Customer type"
                                    >
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
