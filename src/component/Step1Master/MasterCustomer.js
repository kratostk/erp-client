import React, { useState } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { openCustomerModal, closeCustomerModal } from '../../redux/actions'
import PopupEditCustomer from '../Step2PopupEdit/PopupEditCustomer';
import SearchFilter from '../SearchFilter'

function MasterCustomer() {
     // ---------- REDUX STATE --------------
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customers.customers.data)
     // ---------- REDUX STATE --------------

    // ---------- LOCAL STATE --------------
    const [ filterData, setFilterData ] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = function(m) {
        setShow(m);
    };
    const handleShow = () => {
        dispatch({type: "TOGGLE_CUSTOMER_POPUP", payload: true})
        // setShow(true)
        // console.log(show);
    };
    // ---------- LOCAL STATE --------------
    
    React.useEffect(() => {
        Axios.get('http://localhost:5000/api/customer', { withCredentials: true })
        .then(res => {
            // setCustomer(res.data.recordset)
            dispatch({type: 'SET_CUSTOMERS', payload: res.data.recordset})
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    const sayHi = (id) => alert(`ID: ${id} 😀`)

    const filterCustomers = (text) => {
        const res = customers.filter(item => item.Name.toLowerCase().match(text.toLowerCase()) || item.Email.toLowerCase().match(text.toLowerCase()))
        setFilterData(res)
        
    }


    // ------------------Conditional render data -------------------------
    const renderData = filterData.length ? filterData.map((item, i) => {
        return (
            <tr key={i} onClick={() => sayHi(item.IdMasterData)}>
                <td>{i}</td>
                <td>{item.Type}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
                <td>
                    <PopupEditCustomer/>
                </td>
            </tr>
        )
    }) : customers && customers.map((item, i) => {
        return (
            <tr key={i}>
                <td>{i}</td>
                <td>{item.Type}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
                <td>
                    <PopupEditCustomer/>
                </td>
            </tr>
        )
    })
    // ------------------Conditional render data -------------------------

    return (
        <div >
             <Row>
                    <Col >
                        <SearchFilter masterData={ filterCustomers }/>                      
                    </Col>

                    <Col >
                        <div class="col float-end">
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
            <div class="col float-end">
                <Button variant="danger"  size="sm">Export</Button>
            </div>
        </div>
    );
}

export default MasterCustomer;