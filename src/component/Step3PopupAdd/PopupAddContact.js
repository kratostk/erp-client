import React, { useState } from 'react';
import { Modal, Button, Table, Form, Col, Row, Spinner } from 'react-bootstrap'
import PopupCustomer from '../Step2PopupData/PopupCustomer';
import { useSelector, useDispatch } from 'react-redux'
import { addContact } from '../../redux/contact/asyncActions'

function PopupAddContact({ isChildIDSet, isAddedContact, getSelectedContactID }) {

    // ************************** REDUX STORE *****************************\\
    const dispatch = useDispatch()
    const contacts = useSelector(state => state.contacts.contacts.data)

    // ************************** REDUX STORE *****************************\\
    

    
    // ************************** LOCAL STATES *****************************\\
    const [ checkboxState, setCheckboxState ] = useState(false)
    const [ selectedContactID, setSelectedContactID ] = useState(null)
    const [show, setShow] = useState(false);
    const [ saveBtnSpinner, setSaveBtnSpinner ] = useState(false);

    //----------------------

    const [ContactType, setContactType] = useState(null);
    const [ContactName, setContactName] = useState('');
    const [ContactPhone, setContactPhone] = useState('');
    const [ContactEmail, setContactEmail] = useState('');
    const [ContactFAX, setContactFAX] = useState('');
    // ************************** LOCAL STATES *****************************\\


    const handleShow = () => setShow(true);
    const handleClose = () => {
        setCheckboxState(false)
        setSaveBtnSpinner(false)
        setShow(false)
    };

    const btnDecide = (!isAddedContact || isChildIDSet === 'address') ? true : false;

    // ************************* Save Function *************************//
    const handleSave = (e) => {
        e.preventDefault();
        setSaveBtnSpinner(true)
        // if use existing customer dont make request
        if(!checkboxState) {
            const contactData = {
                ContactType : ContactType,
                ContactName : ContactName,
                ContactPhone : ContactPhone,
                ContactEmail : ContactEmail,
                ContactFAX : ContactFAX
            };
            // setSpinnerState(true)
            dispatch(addContact(contactData)) // <-- return promise
            .then(data => {
                //setSpinnerState(false) // stop loading animation
                getSelectedContactID(data.IdMasterData) // set just created row id to be used to reference in relation table
                setSaveBtnSpinner(false)
                handleClose()
            })
            .catch(err => {
                //setSpinnerState(false)
                console.log(err)
                setSaveBtnSpinner(false)
            })
        }else {
            // SELECT CUSTOMER FROM EXISTING DATA

            // set selected ID to setState of parent component
            getSelectedContactID(selectedContactID)
            handleClose()
        }
    }
    // ************************* Save Function *************************//
    


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
                                        onChange={(e) => setSelectedContactID(e.target.value)} 
                                        disabled={!checkboxState} 
                                        defaultValue="Please select Contacts">
                                        <option value='' label='Please select an contact' key='default'/>
                                        { contacts && contacts.map((item, i) => (
                                            <option value={item.IdMasterData} label={item.Name} key={i}/>
                                        ))}

                                    </Form.Select>
                                    
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="ContactTypeDropdown">
                                    <Form.Label>Contact type</Form.Label>
                                    <Form.Select disabled={checkboxState}  onChange={(e) => setContactType(e.target.value)}>
                                        <option>Please select Contact type</option>
                                        <option value='customer'>Customer</option>
                                        <option value='employee'>Employee</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="ContactNameInput">
                                    <Form.Label>Contact name</Form.Label>
                                    <Form.Control disabled={checkboxState} onChange={(e) => setContactName(e.target.value)}  type="ContactName" placeholder="Contact name" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="EmailInput">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control disabled={checkboxState} onChange={(e) => setContactEmail(e.target.value)} type="Email" placeholder="Email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="PhoneInput">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control disabled={checkboxState} onChange={(e) => setContactPhone(e.target.value)}   type="Phone" placeholder="Phone" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="FAXInput">
                                    <Form.Label>FAX</Form.Label>
                                    <Form.Control disabled={checkboxState} onChange={(e) => setContactFAX(e.target.value)}  type="FAX" placeholder="FAX" />
                                </Form.Group>
                            </Row>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button onClick={handleSave} variant="success" size="sm">
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
                    <Button variant="secondary" onClick={handleClose} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAddContact;

