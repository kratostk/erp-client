import React, { useState } from 'react';
import { Button, Table, Row, Col, Container, Form, Modal, Spinner } from 'react-bootstrap'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { openContactModal, closeContactModal } from '../../redux/actions'
//import BootstrapTable from 'react-bootstrap-table-next';  
//import paginationFactory from 'react-bootstrap-table2-paginator';
import SearchFilter from '../SearchFilter'
import { getContacts, updateContact, deleteContact } from '../../redux/contact/asyncActions'
import PopupAddCustomer from '../Step3PopupAdd/PopupAddAddress'

function MasterContact() {
    // ############################################### REDUX STORE ###############################################\\
    const dispatch = useDispatch()
    const contacts = useSelector(state => state.contacts.contacts.data) // from redux store
    const customers = useSelector(state => state.customers.customers.data) // from redux store
    const myContacts = useSelector(state => state.contacts.contacts)
    const customerContacts = useSelector(state => state.relationships.customerContacts) // -> filter
    const customerAddresses = useSelector(state => state.relationships.customerAddresses) // -> filter
    // ############################################### REDUX STORE ###############################################\\

    // ############################################### LOCAL STATE ###############################################\\
    const [ showEditModal, setShowEditModal ] = useState(null)
    const [ filterData, setFilterData ] = useState([])
    const [ selectedContact, setSelectedContact ] = useState(null)
    const [ relationCustomerArr, setrelationCustomerArr ] = useState([])
    const [ updateBtnSpinner, setUpdateBtnSpinner ] = useState(false)
    
    const [show, setShow] = useState(false);
    const handleClose = function (m) {
        setShow(m);
    };

    //-------------- messy data
    const [ type, setType ] = useState(null)
    const [ name, setName ] = useState(null)
    const [ email, setEmail ] = useState(null)
    const [ phone, setPhone ] = useState(null)
    const [ fax, setFax ] = useState(null)
    const updateBtnDecide = !name && !email && !phone && !fax
    // ############################################### LOCAL STATE ###############################################\\


    // ############################################### HANDLE EDIT MODAL FUNCTIONS ###############################################\\
    const handleOpenEdit = (contact) => {
        setSelectedContact(contact)
        setShowEditModal(true)
    }

    const handleUpdateContact = () => {
        setUpdateBtnSpinner(true)
        const pendingUpdateData = {
            ContactType: type ? type : selectedContact.Type,
            ContactName: name ? name : selectedContact.Name,
            ContactPhone: phone ? phone : selectedContact.Phone,
            ContactEmail: email ? email : selectedContact.Email,
            ContactFAX: fax ? fax : selectedContact.FAX,
            IdMasterData: selectedContact.IdMasterData
        }
        dispatch(updateContact(pendingUpdateData))
        .then(() => {
            setShowEditModal(false)
            setUpdateBtnSpinner(false)
        })
        .catch(err => {
            setUpdateBtnSpinner(false)
        })

    }
    // ############################################### HANDLE EDIT MODAL FUNCTIONS ###############################################\\



    const filterContacts = (text) => {
        const res = contacts.filter(item => item.Name.toLowerCase().match(text.toLowerCase()) || item.Email.toLowerCase().match(text.toLowerCase()))
        setFilterData(res)
        
    }



    //################################### HANDLE DELETE ####################################\\
    const handleDelete = () => {
        dispatch(deleteContact(selectedContact.IdMasterData))
        .then(() => {
            setShowEditModal(false)
        })
        
    }
    //################################### HANDLE DELETE ####################################\\


    // ------------------Conditional render data -------------------------


    const renderData = filterData.length ? filterData.map((item, i) => {
        return (
            <tr className='table-row' key={i} onClick={ () => handleOpenEdit(item) }>
                <td>{i}</td>
                <td>{item.Type}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
            </tr>
        )
    }) : contacts && contacts.map((item, i) => {
        return (
            <tr className='table-row' key={i} onClick={ () => handleOpenEdit(item) }>
                <td>{i}</td>
                <td>{item.Type}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
            </tr>
        )
    })

    const renderSelectedContact = selectedContact ? (
        <div className="contactmodal" key={selectedContact.IdMasterData} >
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="ContactTypeDropdown">
                        <Form.Label>Contact type</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)} defaultValue={selectedContact.Type}>
                            <option value='customer'>Customer</option>
                            <option value='employee'>Employee</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="ContactNameInput">
                        <Form.Label>Contact name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="ContactName" placeholder={selectedContact.Name}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="EmailInput">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="Email" placeholder={selectedContact.Email} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="PhoneInput">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control onChange={(e) => setPhone(e.target.value)} type="Phone" placeholder={selectedContact.Phone}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="FAXInput">
                        <Form.Label>FAX</Form.Label>
                        <Form.Control onChange={(e) => setFax(e.target.value)} type="FAX" placeholder={selectedContact.FAX} />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    ): null

    const filterRelationCustomer = (contact_ID) => {
        //1 filter contactID out of relationship collection
        if(!contact_ID) return null;


        const collectionOfTargetContactID = customerContacts.filter(item => item.Contact_Id === contact_ID.IdMasterData)
        // {conID: 0, cusID: 1},
        // {conID: 0, cusID: 2},
        // ...

        let res = []
        for(let i = 0; i < collectionOfTargetContactID.length; i++) {
            for(let j = 0; j < customers.length; j++) {
              if(collectionOfTargetContactID[i].Customer_Id === customers[j].IdMasterData){
                res.push(customers[j])
              }
            }
        }
        setrelationCustomerArr(res)  
    }
    // ------------------Conditional render data -------------------------
    React.useEffect(() => {
        dispatch(getContacts()) // Fetch initial contacts data
    }, [])

    React.useEffect(() => {
        filterRelationCustomer(selectedContact)
    }, [customerContacts, selectedContact])

    return (
        <div >         
                <Row>
                    <Col >
                        <SearchFilter masterData={ filterContacts }/>
                    </Col>

                    <Col >
                        <div className="col float-end">
                            <Button variant="success" size="sm" onClick={() => dispatch({ type: 'OPEN_CON', payload: true })} >
                                Add Contact
                            </Button>
                        </div>
                    </Col>
                </Row>
            
            <br />
            <Table striped bordered hover size="sm">
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
                    { renderData }
                </tbody>
            </Table>
            <div className="col float-end">
                <Button variant="danger" size="sm">Export</Button>
            </div>


{/**##################################################### EDIT MODAL ################################################################## */}

            <>
            <Modal
                size="lg"
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { renderSelectedContact }

                    {/* <PopupAddCustomer /> */}
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
                            { relationCustomerArr ? relationCustomerArr.map((item, i) => (
                                <tr>
                                    <td>{i}</td>
                                    <td>{ item.Customer_Type }</td>
                                    <td>{ item.Company }</td>
                                    <td>{ item.Email }</td>
                                    <td>{ item.Phone }</td>
                                    <td>{ item.FAX }</td>
                                </tr>
                            )): null }
                            
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ handleDelete } variant="danger" size="sm">DELETE</Button>
                    <Button onClick={ handleUpdateContact } variant="success" size="sm" disabled={ updateBtnDecide }>
                        { updateBtnSpinner ? (
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        ): null}
                        UPDATE</Button>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)} size="sm">
                        CLOSE
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        </div>
    );
}

export default MasterContact;