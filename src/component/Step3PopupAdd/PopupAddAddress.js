import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addAddress } from '../../redux/address/asyncActions'

function PopupAddAddress({ isChildIDSet ,isAddedContact, getSelectedAddressID }) {
    // ************************** REDUX STORE ***************************\\
    const dispatch = useDispatch()
    const addresses = useSelector(state => state.addresses.addresses.data)
    // ************************** REDUX STORE ***************************\\


    // ************************** LOCAL STATES ***************************\\
    const [ checkboxState, setCheckboxState ] = useState(false)
    const [ selectedAddressID, setSelectedAddressID ] = useState(null)
    const [ saveBtnSpinner, setSaveBtnSpinner ] = useState(false)
    const [show, setShow] = useState(false);

    const [AddressType, setAddressType] = useState('');
    const [AddressName, setAddressName] = useState('');
    const [AddressDescription, setAddressDescription] = useState('');
    const [AddressNumber, setAddressNumber] = useState('');
    const [AddressBuilding, setAddressBuilding] = useState('');   
    const [AddressSubDistrict, setAddressSubDistrict] = useState('');
    const [AddressDistrict, setAddressDistrict] = useState('');
    const [AddressProvince, setAddressProvince] = useState('');
    const [AddressPostalCode, setAddressPostalCode] = useState('');
    // ************************** LOCAL STATES ***************************\\
    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setCheckboxState(false)
        setSaveBtnSpinner(false)
        setShow(false)
    };

    const btnDecide = (!isAddedContact || isChildIDSet === 'contact') ? true : false;

    // ************************* Save Function *************************//
    const handleSave = (e) => {
        e.preventDefault();
        
        setSaveBtnSpinner(true)
        // if use existing customer dont make request
        if(!checkboxState) {
            const addressData = {
                AddressType: AddressType,
                AddressName: AddressName,
                AddressDescription: AddressDescription,
                AddressNumber: AddressNumber,
                AddressBuilding: AddressBuilding,
                AddressSubDistrict: AddressSubDistrict,
                AddressDistrict: AddressDistrict,           
                AddressProvince: AddressProvince,
                AddressPostalCode: AddressPostalCode
            };
            // setSpinnerState(true)
            dispatch(addAddress(addressData)) // <-- return promise
            .then(data => {
                //setSpinnerState(false) // stop loading animation
                getSelectedAddressID(data.IdMasterData) // set just created row id to be used to reference in relation table
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
            getSelectedAddressID(selectedAddressID)
            handleClose()
        }
    }
    // ************************* Save Function *************************//

    return (
        <>
            <div class="col float-end">
                <Button disabled={btnDecide} variant="success" onClick={handleShow} size="sm">
                    Add Address
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
                    <h3 >Add Address</h3>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <Form>

                            <Row className="mb-3">
                                <Form.Check 
                                    value={checkboxState}
                                    type="switch"
                                    id="custom-switch"
                                    label="From existing addresses"
                                    onChange={(e) => setCheckboxState(e.target.checked)}
                                />
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressDropdown">
                                    <Form.Label>Select Addresses</Form.Label>
                                    <Form.Select 
                                        onChange={(e) => {
                                            setSelectedAddressID(e.target.value)
                                        }} 
                                        disabled={!checkboxState} >
                                        <option value='' label='Please select an address' key='default'/>
                                        { addresses && addresses.map((item, i) => (
                                            <option value={item.IdMasterData} label={item.Name} key={i}/>
                                        ))}

                                    </Form.Select>
                                    
                                </Form.Group>
                            </Row>


                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressTypeDropdown">
                                    <Form.Label>Address type</Form.Label>
                                    <Form.Select 
                                        disabled={checkboxState} 
                                        defaultValue="Please select Address type"
                                        onChange={(e) => setAddressType(e.target.value)}
                                    >
                                        <option>Please select Address type</option>
                                        <option value='company'>Company</option>
                                        <option value='personal'>Personal</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="AddressNameInput">
                                    <Form.Label>Address name</Form.Label>
                                    <Form.Control onChange={(e) => setAddressName(e.target.value)} disabled={checkboxState} type="AddressName" placeholder="Address name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="DescriptionInput">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control onChange={(e) => setAddressDescription(e.target.value)} disabled={checkboxState} type="Description" placeholder="Description" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="AddressNumberInput">
                                    <Form.Label>Address number</Form.Label>
                                    <Form.Control onChange={(e) => setAddressNumber(e.target.value)} disabled={checkboxState} type="AddressNumber" placeholder="Address number" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="BuildingInput">
                                    <Form.Label>Building</Form.Label>
                                    <Form.Control onChange={(e) => setAddressBuilding(e.target.value)} disabled={checkboxState} type="Building" placeholder="Building" />
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="SubDistrictInput">
                                    <Form.Label>SubDistrict</Form.Label>
                                    <Form.Control onChange={(e) => setAddressSubDistrict(e.target.value)} disabled={checkboxState} type="SubDistrict" placeholder="SubDistrict" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="DistrictInput">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control onChange={(e) => setAddressDistrict(e.target.value)} disabled={checkboxState} type="District" placeholder="District" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="ProvinceInput">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control onChange={(e) => setAddressProvince(e.target.value)} disabled={checkboxState} type="Province" placeholder="Province" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="PostalCodeInput">
                                    <Form.Label>PostalCode</Form.Label>
                                    <Form.Control onChange={(e) => setAddressPostalCode(e.target.value)} disabled={checkboxState} type="PostalCode" placeholder="PostalCode" />
                                </Form.Group>
                            </Row>
                        </Form>
                    </div >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" size="sm" onClick={handleSave}>
                        {saveBtnSpinner ? (
                                <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ): null}
                        Save</Button>
                    <Button variant="secondary" onClick={handleClose} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupAddAddress;

// JavaScript source code
