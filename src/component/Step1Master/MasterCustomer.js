import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { openCustomerModal, closeCustomerModal } from '../../redux/actions'

function MasterCustomer() {
    const dispatch = useDispatch()
    const customers = useSelector(state => state.masterDatas.customer)

    // const [customer, setCustomer] = React.useState([]);
    const [show, setShow] = useState(false);
    const handleClose = function(m) {
        setShow(m);
    };
    const handleShow = () => {
        dispatch({type: "TOGGLE_CUSTOMER_POPUP", payload: true})
        // setShow(true)
        // console.log(show);
    };
    
    
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

    const renderData = customers ? customers.map((item, i) => {
        return(
            <tr key={i} >
                <td>{i}</td>
                <td>{item.Type}</td>
                <td>{item.Company}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
            </tr>
        )
    }) : null

    return (
        <div >
            <div class="col float-end">
                <Button variant="success" size="sm" onClick={() => dispatch(openCustomerModal())} >
                    Add Customer
                </Button>
                
            </div>
            <br/><br/>

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