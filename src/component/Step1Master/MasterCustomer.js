import React, { useState } from 'react';
import { Button, Table, Row, Col, Modal, Form, Spinner } from 'react-bootstrap'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { openCustomerModal, closeCustomerModal } from '../../redux/actions'
import SearchFilter from '../SearchFilter'
import { getCustomers, updateCustomer, deleteCustomer } from '../../redux/customer/asyncActions'

function MasterCustomer() {
     // ****************************** REDUX STATE ******************************\\
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customers.customers.data)
    const contacts = useSelector(state => state.contacts.contacts.data) // from redux store
    const addresses  = useSelector(state => state.addresses.addresses.data)
    const customerAddresses = useSelector(state => state.relationships.customerAddresses) // -> filter
    const customerContacts = useSelector(state => state.relationships.customerContacts) // -> filter
     // ****************************** REDUX STATE ******************************\\

    // ****************************** LOCAL STATES ******************************\\
    const [ filterData, setFilterData ] = useState([])
    const [ selectedCustomer, setSelectedCustomer ] = useState(null)
    const [ showEditModal, setShowEditModal ] = useState(null)
    const [ updateBtnSpinner, setUpdateBtnSpinner ] = useState(false)
    const [ relationContactArr, setRelationContactArr ] = useState([])
    const [ relationAddressArr, setRelationAddressArr ] = useState([])

    // ------- messy states
    const [ type, setType ] = useState(null)
    const [ company, setCompany ] = useState(null)
    const [ email, setEmail ] = useState(null)
    const [ phone, setPhone ] = useState(null)
    const [ FAX, setFax ] = useState(null)
    const updateBtnDecide = !type && !company && !email && !phone && !FAX
    const [show, setShow] = useState(false);
    // ****************************** LOCAL STATES ******************************\\


    // ****************************** MODAL HANDLING FUNCTIONS ******************************\\
    
    const handleClose = function(m) {
        setShow(m);
    };
    const handleShow = () => {
        dispatch({type: "TOGGLE_CUSTOMER_POPUP", payload: true})
        // setShow(true)
    };
    // ****************************** MODAL HANDLING FUNCTIONS ******************************\\
    
    
    const handleOpenEdit = (customer) => {
        setSelectedCustomer(customer)
        setShowEditModal(true)
    }
    const handleUpdateCustomer = () => {
        setUpdateBtnSpinner(true)
        const pendingUpdateData = {
            CustomerType: type ? type : selectedCustomer.Customer_Type,
            CustomerName: company ? company : selectedCustomer.Company,
            CustomerPhone: phone ? phone : selectedCustomer.Phone,
            CustomerEmail: email ? email : selectedCustomer.Email,
            CustomerFAX: FAX ? FAX : selectedCustomer.FAX,
            IdMasterData: selectedCustomer.IdMasterData
        }
        dispatch(updateCustomer(pendingUpdateData))
        .then(() => {
            setShowEditModal(false)
            setUpdateBtnSpinner(false)
        }).catch(err => {
            console.error(err)
            setUpdateBtnSpinner(false)
        })

    }


    const renderSelectedCustomer = selectedCustomer ? (
        <div className="contactmodal" key={selectedCustomer.IdMasterData} >
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="CustomerTypeDropdown">
                        <Form.Label>Customer type</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)} type="CustomerType" placeholder={ selectedCustomer.Customer_Type } >
                            <option value='company'>Company</option>
                            <option value='personal'>Personal</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="CustomerNameInput">
                        <Form.Label>Customer name</Form.Label>
                        <Form.Control onChange={(e) => setCompany(e.target.value)} type="CustomerName" placeholder={ selectedCustomer.Company }  />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="EmailInput">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="Email" placeholder={ selectedCustomer.Email }  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="PhoneInput">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control onChange={(e) => setPhone(e.target.value)} type="Phone" placeholder={ selectedCustomer.Phone }  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="FAXInput">
                        <Form.Label>FAX</Form.Label>
                        <Form.Control onChange={(e) => setFax(e.target.value)} type="FAX" placeholder={ selectedCustomer.FAX } />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    ): null

    //################################### HANDLE DELETE ####################################\\
    const handleDelete = () => {
        dispatch(deleteCustomer(selectedCustomer.IdMasterData))
        .then(() => {
            setShowEditModal(false)
        })
        
    }
    //################################### HANDLE DELETE ####################################\\

    


    // *********************************** RENDER && FILTER FUNCTIONS *********************************\\
    const filterCustomers = (text) => {
        const res = customers.filter(item => item.Company.toLowerCase().match(text.toLowerCase()) || item.Email.toLowerCase().match(text.toLowerCase()))
        setFilterData(res)
        
    }
    const renderData = filterData.length ? filterData.map((item, i) => {
        return (
            <tr key={i} onClick={ () => handleOpenEdit(item) }>
                <td>{i}</td>
                <td>{item.Type}</td>
                <td>{item.Company}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
            </tr>
        )
    }) : customers && customers.map((item, i) => {
        return (
            <tr key={i} onClick={ () => handleOpenEdit(item) }>
                <td>{i}</td>
                <td>{item.Customer_Type}</td>
                <td>{item.Company}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
            </tr>
        )
    })


    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FILTER RELATION DATA @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\\
    const filterRelationAddress = (customer_ID) => {
        if(!customer_ID) return null;

        const collectionOfTargetAddressID = customerAddresses.filter(item => item.Customer_Id === customer_ID.IdMasterData)

        let res = []
        for(let i = 0; i < collectionOfTargetAddressID.length; i++) {
            for(let j = 0; j < addresses.length; j++) {
              if(collectionOfTargetAddressID[i].Address_Id === addresses[j].IdMasterData){
                res.push(addresses[j])
              }
            }
        }
        
        setRelationAddressArr(res)  
    }
    const filterRelationContact = (customer_ID) => {
        if(!customer_ID) return null;

        const collectionOfTargetContactID = customerContacts.filter(item => item.Customer_Id === customer_ID.IdMasterData)

        let res = []
        for(let i = 0; i < collectionOfTargetContactID.length; i++) {
            for(let j = 0; j < contacts.length; j++) {
              if(collectionOfTargetContactID[i].Contact_Id === contacts[j].IdMasterData){
                res.push(contacts[j])
              }
            }
        }
        
        setRelationContactArr(res)  
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FILTER RELATION DATA @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\\
    React.useEffect(() => {
        dispatch(getCustomers())
    }, [])
    React.useEffect(() => {
        filterRelationAddress(selectedCustomer)
        filterRelationContact(selectedCustomer)
    }, [customerAddresses, customerContacts , selectedCustomer ])
    // *********************************** RENDER && FILTER FUNCTIONS *********************************\\

    return (
        <div >
             <Row>
                    <Col >
                        <SearchFilter masterData={ filterCustomers }/>                      
                    </Col>

                    <Col >
                        <div className="col float-end">
                            <Button variant="success" size="sm" onClick={() => dispatch({ type: 'OPEN_CUS', payload: true })} >
                                Add Customer
                            </Button>
                        </div>
                    </Col>
                </Row>
            <br/>

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
                    { renderData }
                </tbody>
            </Table>
            <div className="col float-end">
                <Button variant="danger"  size="sm">Export</Button>
            </div>



            {/**########################################### EDIT MODAL ####################################### */}

            <Modal
                size="xl"
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        { renderSelectedCustomer }


                        {/* <PopupAddAddress /> <br /><br /> */}

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
                                
                                { relationAddressArr ? relationAddressArr.map((item, i) => (
                                    <tr>
                                        <td>{i}</td>
                                        <td>{item.TypeAddress}</td>
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
                        {/* <PopupAddContact /> */}
                        <br /><br />
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
                                
                                { relationContactArr ? relationContactArr.map((item, i) => (
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

                    </div >
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ handleDelete } variant="danger" size="sm">DELETE</Button>
                    <Button onClick={ handleUpdateCustomer } disabled={ updateBtnDecide } variant="success" size="sm">
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
        </div>
    );
}

export default MasterCustomer;