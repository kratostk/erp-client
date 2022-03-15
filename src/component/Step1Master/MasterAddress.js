import React, { useState } from 'react';
import { Button, Table, Row, Col, Container, Form } from 'react-bootstrap'
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { openAddressModal, closeAddressModal } from '../../redux/actions'
import { BsPencilSquare } from "react-icons/bs";
import PopupEditAddress from '../Step2PopupEdit/PopupEditAddress';
import { getAddresses } from '../../redux/address/asyncActions'
import SearchFilter from '../SearchFilter'

function MasterAddress() {
    // ******************************* REDUX STORE *******************************//
    const dispatch = useDispatch()
    const addresses = useSelector(state => state.addresses.addresses.data)
    // ******************************* REDUX STORE *******************************//
   
    // ******************************* LOCAL STATE *******************************//
    const [ filteredAddress, setFilteredAddress ] = useState([])
    const [show, setShow] = useState(false);
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

    const renderAddresses = filteredAddress.length ? filteredAddress.map((item, i) => {
        return (
            <tr key={i}>
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
            <tr key={i}>
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


    React.useEffect(() => {
        dispatch(getAddresses())
    }, [])
    // ******************************* RENDER && FILTER FUNCTIONS ********************************\\

    return (
        <div >
           
                <Row>
                    <Col >
                        <SearchFilter masterData={ handleFilter }/>
                    </Col>

                    <Col >
                        <div class="col float-end">
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
                        <th>.....</th>
                    </tr>
                </thead>
                <tbody>
                    { renderAddresses }
                </tbody>
            </Table>
            <div class="col float-end">
                <Button variant="danger" size="sm">Export</Button>
            </div>
        </div>
    );
}

export default MasterAddress;