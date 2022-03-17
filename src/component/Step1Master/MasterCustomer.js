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
     // ****************************** REDUX STATE ******************************\\

    // ****************************** LOCAL STATES ******************************\\
    const [ filterData, setFilterData ] = useState([])
    const [ selectedCustomer, setSelectedCustomer ] = useState(null)
    const [ showEditModal, setShowEditModal ] = useState(null)
    const [ updateBtnSpinner, setUpdateBtnSpinner ] = useState(false)

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
    React.useEffect(() => {
        dispatch(getCustomers())
    }, [])
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