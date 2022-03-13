import React, { useState } from 'react';
import { Button, Table, Row, Col, Container, Form } from 'react-bootstrap'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { openContactModal, closeContactModal } from '../../redux/actions'
import { BsPencilSquare } from "react-icons/bs";
import PopupEditContact from '../Step2PopupEdit/PopupEditContact';
//import BootstrapTable from 'react-bootstrap-table-next';  
//import paginationFactory from 'react-bootstrap-table2-paginator';
import SearchFilter from '../SearchFilter'

function MasterContact() {
    const dispatch = useDispatch()
    const contacts = useSelector(state => state.masterDatas.contact) // from redux store

    // ---------- LOCAL STATE --------------
    const [ filterData, setFilterData ] = useState([])
    // ---------- LOCAL STATE --------------

    // const [Contacts, setContacts] = React.useState([]);
    const [show, setShow] = useState(false);
    const handleClose = function (m) {
        setShow(m);
    };
    const handleShow = () => {
        dispatch({ type: "TOGGLE_CONTACT_POPUP", payload: true })
        // setShow(true)
        // console.log(show);
    }; 

    React.useEffect(() => {
        Axios.get('http://localhost:5000/api/contact', { withCredentials: true })
        .then(res => {
            // setContacts(res.data.recordset)
            dispatch({type: 'SET_CONTACTS', payload: res.data.recordset})
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    const sayHi = (id) => alert(`ID: ${id} 😀`)

    const filterContacts = (text) => {
        if(text === undefined || text === null) {
            setFilterData(contacts)
        }else {
            const res = contacts.filter(item => item.Name.toLowerCase().match(text.toLowerCase()))
            setFilterData(res)
        }
        
    }

    const renderData = contacts ? filterData.map((item, i) => {
        return (
            <tr key={i} onClick={() => sayHi(item.IdMasterData)}>
                <td>{i}</td>
                <td>{item.Type}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
                <td>
                    <PopupEditContact/>
                </td>
            </tr>
        )
    }) : null

    return (
        <div >         
                <Row>
                    <Col >
                        <SearchFilter masterData={ filterContacts }/>
                        {/* <Form.Select aria-label="Default select example" size="sm">
                            <option>Search </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select> */}
                    </Col>

                    <Col >
                        <div class="col float-end">
                            <Button variant="success" size="sm" onClick={() => dispatch(openContactModal())} >
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
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    { renderData }
                </tbody>
            </Table>
            <div class="col float-end">
                <Button variant="danger" size="sm">Export</Button>
            </div>
        </div>
    );
}

export default MasterContact;