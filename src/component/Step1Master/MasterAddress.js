import React, { useState } from 'react';
import { Button, Table, Row, Col, Container, Form, Modal, Spinner } from 'react-bootstrap'
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { openAddressModal, closeAddressModal } from '../../redux/actions'
import { BsPencilSquare } from "react-icons/bs";
import PopupEditAddress from '../Step2PopupEdit/PopupEditAddress';
import { getAddresses, updateAddress, deleteAddress } from '../../redux/address/asyncActions'
import SearchFilter from '../SearchFilter'

function MasterAddress() {
    // ******************************* REDUX STORE *******************************//
    const dispatch = useDispatch()
    const addresses = useSelector(state => state.addresses.addresses.data)
    const customers = useSelector(state => state.customers.customers.data)
    const customerAddresses = useSelector(state => state.relationships.customerAddresses) // -> filter

    // ******************************* REDUX STORE *******************************//
   
    // ******************************* LOCAL STATE *******************************//
    const [ filteredAddress, setFilteredAddress ] = useState([])
    const [ showEditModal, setShowEditModal ] = useState(null)
    const [ selectedAddress, setSelectedAddress ] = useState(null)
    const [show, setShow] = useState(false);
    const [ updateBtnSpinner, setUpdateBtnSpinner ] = useState(false)
    const [ relationCustomerArr ,setRelationCustomerArr ] = useState([])

    //------messy state
    const [ type, setType ] = useState(null)
    const [ name, setName ] = useState(null)
    const [ description, setDescription ] = useState(null)
    const [ addressNum, setAddressNum ] = useState(null)
    const [ building, setBuilding ] = useState(null)
    const [ subDistrict, setSubDistrict ] = useState(null)
    const [ district, setDistrict ] = useState(null)
    const [ province, setProvince ] = useState(null)
    const [ postalCode , setPostalCode ] = useState(null)
    const updateBtnDecide = !type && !name && !description && !addressNum && !building && !subDistrict && !district && !province && !postalCode
    // ******************************* LOCAL STATE *******************************//

    // ******************************* MODAL HANDLE FUNCTIONS ****************************\\
    const handleClose = function (m) {
        setShow(m);
    };
    const handleShow = () => {
        dispatch({ type: "TOGGLE_ADDRESS_POPUP", payload: true })
        
    }; 
    // ******************************* MODAL HANDLE FUNCTIONS ****************************\\


    // ******************************* RENDER && FILTER FUNCTIONS ********************************\\
    const handleFilter = (text) => {
        const result = addresses.filter(item => item.Name.toLowerCase().match(text.toLowerCase()))
        setFilteredAddress(result)
    }

    //################################### HANDLE DELETE ####################################\\
    const handleDelete = () => {
        dispatch(deleteAddress(selectedAddress.IdMasterData))
        .then(() => {
            setShowEditModal(false)
        })
        
    }
    //################################### HANDLE DELETE ####################################\\

    //################################### EDIT FUNCTIONS ########################################\\
    const handleUpdateAddress = () => {
        setUpdateBtnSpinner(true)
        const pendingUpdateData = {
            AddressType: type ? type : selectedAddress.TypeAddress,
            AddressName: name ? name : selectedAddress.Name,
            AddressDescription: description ? description : selectedAddress.Description,
            AddressNumber: addressNum ? addressNum : selectedAddress.AddressNumber,
            AddressBuilding: building ? building : selectedAddress.Building,
            AddressSubDistrict: subDistrict ? subDistrict : selectedAddress.SubDistrict,
            AddressDistrict: district ? district : selectedAddress.District,
            AddressProvince: province ? province : selectedAddress.Province,
            AddressPostalCode: postalCode ? postalCode : selectedAddress.PostalCode,
            IdMasterData: selectedAddress.IdMasterData
        }
        dispatch(updateAddress(pendingUpdateData))
        .then(() => {
            setShowEditModal(false)
            setUpdateBtnSpinner(false)
        })
        .catch(err => {
            console.error(err)
            setUpdateBtnSpinner(false)
        })

    }
    const handleOpenEdit = (address) => {
        setSelectedAddress(address)
        setShowEditModal(true)
    }
    const renderSelectedAddress = selectedAddress ? (
        <div className="addressmodal" key={selectedAddress.IdMasterData} >
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="AddressTypeDropdown">
                        <Form.Label>Address type</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)} defaultValue={selectedAddress.TypeAddress}>
                            <option value='public'>Public</option>
                            <option value='personal'>Personal</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="AddressNameInput">
                        <Form.Label>Address name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="AddressName" placeholder={ selectedAddress.Name } />
                    </Form.Group>

                    <Form.Group as={Col} controlId="DescriptionInput">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={(e) => setDescription(e.target.value)} type="Description" placeholder={ selectedAddress.Description } />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="AddressNumberInput">
                        <Form.Label>Address number</Form.Label>
                        <Form.Control onChange={(e) => setAddressNum(e.target.value)} type="AddressNumber" placeholder={ selectedAddress.AddressNumber } />
                    </Form.Group>

                    <Form.Group as={Col} controlId="BuildingInput">
                        <Form.Label>Building</Form.Label>
                        <Form.Control onChange={(e) => setBuilding(e.target.value)} type="Building" placeholder={ selectedAddress.Building } />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="SubDistrictInput">
                        <Form.Label>SubDistrict</Form.Label>
                        <Form.Control onChange={(e) => setSubDistrict(e.target.value)} type="SubDistrict" placeholder={ selectedAddress.SubDistrict } />
                    </Form.Group>

                    <Form.Group as={Col} controlId="DistrictInput">
                        <Form.Label>District</Form.Label>
                        <Form.Control onChange={(e) => setDistrict(e.target.value)} type="District" placeholder={ selectedAddress.District } />
                    </Form.Group>

                    <Form.Group as={Col} controlId="ProvinceInput">
                        <Form.Label>Province</Form.Label>
                        <Form.Control onChange={(e) => setProvince(e.target.value)} type="Province" placeholder={ selectedAddress.Province } />
                    </Form.Group>

                    <Form.Group as={Col} controlId="PostalCodeInput">
                        <Form.Label>PostalCode</Form.Label>
                        <Form.Control onChange={(e) => setPostalCode(e.target.value)} type="PostalCode" placeholder={ selectedAddress.PostalCode } />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    ): null
    //################################### EDIT FUNCTIONS ########################################\\

    
    const renderAddresses = filteredAddress.length ? filteredAddress.map((item, i) => {
        return (
            <tr key={i} onClick={ () => handleOpenEdit(item) }>
                <td>{i}</td>
                <td>{item.TypeAddress}</td>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td>{item.AddressNumber}</td>
                <td>{item.Building}</td>
                <td>{item.SubDistrict}</td>
                <td>{item.District}</td>
                <td>{item.Province}</td>
                <td>{item.PostalCode}</td>
            </tr>
        )
    }) : addresses && addresses.map((item, i) => {
        return (
            <tr key={i} onClick={ () => handleOpenEdit(item) }>
                <td>{i}</td>
                <td>{item.TypeAddress}</td>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td>{item.AddressNumber}</td>
                <td>{item.Building}</td>
                <td>{item.SubDistrict}</td>
                <td>{item.District}</td>
                <td>{item.Province}</td>
                <td>{item.PostalCode}</td>
            </tr>
        )
    })

    // ################################## FILTER RELATIONAL DATA ################################\\
    const filterRelationCustomer = (address) => {
        if(!address) return null;


        const collectionOfTargetAddressID = customerAddresses.filter(item => item.Address_Id === address.IdMasterData)

        let res = []
        for(let i = 0; i < collectionOfTargetAddressID.length; i++) {
            for(let j = 0; j < customers.length; j++) {
              if(collectionOfTargetAddressID[i].Customer_Id === customers[j].IdMasterData){
                res.push(customers[j])
              }
            }
        }
        setRelationCustomerArr(res)
        // setContactsArr(res)  
    }
    // ################################## FILTER RELATIONAL DATA ################################\\

    React.useEffect(() => {
        dispatch(getAddresses())
    }, [])
    React.useEffect(() => {
        filterRelationCustomer(selectedAddress)
    }, [customerAddresses, selectedAddress])
    // ******************************* RENDER && FILTER FUNCTIONS ********************************\\

    return (
        <div >
           
                <Row>
                    <Col >
                        <SearchFilter masterData={ handleFilter }/>
                    </Col>

                    <Col >
                        <div className="col float-end">
                            <Button variant="success" size="sm" onClick={() => dispatch({ type: 'OPEN_ADD' })} >
                                Add Address
                            </Button>
                        </div>
                    </Col>
                </Row>
            

            <br />            
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
                    { renderAddresses }
                </tbody>
            </Table>
            <div className="col float-end">
                <Button variant="danger" size="sm">Export</Button>
            </div>





            {/**#################################### EDIT MODAL #################################### */}
            <Modal
                size="lg"
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        { renderSelectedAddress }
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
                    </div >
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ handleDelete } variant="danger" size="sm">DELETE</Button>
                    <Button onClick={ handleUpdateAddress } disabled={ updateBtnDecide } variant="success" size="sm">
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

export default MasterAddress;