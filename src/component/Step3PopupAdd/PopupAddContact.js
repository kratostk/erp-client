import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row } from 'react-bootstrap'
import PopupCustomer from '../Step2PopupData/PopupCustomer';
import { useSelector } from 'react-redux'

function PopupAddContact({ isChildIDSet, isAddedContact, setSelectedCustomerID }) {

    console.log('from contact popup' ,isChildIDSet)
    // ************************** REDUX STORE *****************************\\
    const contacts = useSelector(state => state.contacts.contacts.data)

    // ************************** REDUX STORE *****************************\\
    

    
    // ************************** LOCAL STATES *****************************\\
    const [ checkboxState, setCheckboxState ] = useState(false)
    const [show, setShow] = useState(false);
    // ************************** LOCAL STATES *****************************\\


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const btnDecide = (!isAddedContact || isChildIDSet === 'address') ? true : false;
    


    return (
        <>
            <div class="col float-end">
                <Button disabled={btnDecide} variant="success" onClick={handleShow} size="sm">
                    Add Contact
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
                    <h3 >Add Contact</h3>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <Form>

                            <Row className="mb-3">
                                <Form.Check 
                                    value={checkboxState}
                                    type="switch"
                                    id="custom-switch"
                                    label="From existing contacts"
                                    onChange={(e) => setCheckboxState(e.target.checked)}
                                />
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="CustomerDropdown">
                                    <Form.Label>Select Contacts</Form.Label>
                                    <Form.Select 
                                        onChange={(e) => setSelectedCustomerID(e.target.value)} 
                                        disabled={!checkboxState} 
                                        defaultValue="Please select Contacts">

                                        { contacts && contacts.map((item, i) => (
                                            <option value={item.IdMasterData} label={item.Name} key={i}/>
                                        ))}

                                    </Form.Select>
                                    
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="ContactTypeDropdown">
                                    <Form.Label>Contact type</Form.Label>
                                    <Form.Select disabled={checkboxState}  defaultValue="Please select Customer type">
                                        <option>Please select Contact type</option>
                                        <option value='customer'>Customer</option>
                                        <option value='employee'>Employee</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="ContactNameInput">
                                    <Form.Label>Contact name</Form.Label>
                                    <Form.Control disabled={checkboxState}  type="ContactName" placeholder="Contact name" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="EmailInput">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control disabled={checkboxState}  type="Email" placeholder="Email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="PhoneInput">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control disabled={checkboxState}   type="Phone" placeholder="Phone" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="FAXInput">
                                    <Form.Label>FAX</Form.Label>
                                    <Form.Control disabled={checkboxState}  type="FAX" placeholder="FAX" />
                                </Form.Group>
                            </Row>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="success" size="sm">Save</Button>
                    <Button variant="secondary" onClick={handleClose} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAddContact;

