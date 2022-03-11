import React, { useState } from 'react';
import { Button, Table, Row, Col, Container, Form } from 'react-bootstrap'
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { openAddressModal, closeAddressModal } from '../../redux/actions'
import { BsPencilSquare } from "react-icons/bs";

function MasterAddress() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = function (m) {
        console.log('tringer')
        console.log(m, 'HEYEYE')
        setShow(m);
    };
    const handleShow = () => {
        dispatch({ type: "TOGGLE_ADDRESS_POPUP", payload: true })
        // setShow(true)
        // console.log(show);
    };

    const [ addresses, setAddresses ] = React.useState([]);

    React.useEffect(() => {
        Axios.get('http://localhost:5000/api/address', { withCredentials: true })
        .then(res => {
            console.log(res)
            setAddresses(res.data.recordset)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    const renderData = addresses.map((item, i) => {
        return (
            <tr key={i}>
                <td>{item.Id}</td>
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

    return (
        <div >
            <Container>
                <Row>
                    <Col >
                        <Form.Select aria-label="Default select example" size="sm">
                            <option>Search </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col >
                        <div class="col float-end">
                            <Button variant="success" size="sm" onClick={() => dispatch(openAddressModal())} >
                                Add Address
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

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
                    {renderData}
                </tbody>
            </Table>
            <div class="col float-end">
                <Button variant="danger" size="sm">Export</Button>
            </div>
        </div>
    );
}

export default MasterAddress;