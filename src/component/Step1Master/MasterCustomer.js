import React, { useState } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { openCustomerModal, closeCustomerModal } from '../../redux/actions'
import PopupEditCustomer from '../Step2PopupEdit/PopupEditCustomer';
import SearchFilter from '../SearchFilter'
import { getCustomers } from '../../redux/customer/asyncActions'

function MasterCustomer() {
     // ****************************** REDUX STATE ******************************\\
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customers.customers.data)
     // ****************************** REDUX STATE ******************************\\

    // ****************************** LOCAL STATES ******************************\\
    const [ filterData, setFilterData ] = useState([])
    const [show, setShow] = useState(false);
    // ****************************** LOCAL STATES ******************************\\


    // ****************************** MODAL HANDLING FUNCTIONS ******************************\\
    
    const handleClose = function(m) {
        setShow(m);
    };
    const handleShow = () => {
        dispatch({type: "TOGGLE_CUSTOMER_POPUP", payload: true})
        // setShow(true)
        // console.log(show);
    };
    // ****************************** MODAL HANDLING FUNCTIONS ******************************\\
    
    


    


    // *********************************** RENDER && FILTER FUNCTIONS *********************************\\
    const filterCustomers = (text) => {
        const res = customers.filter(item => item.Company.toLowerCase().match(text.toLowerCase()) || item.Email.toLowerCase().match(text.toLowerCase()))
        setFilterData(res)
        
    }
    const renderData = filterData.length ? filterData.map((item, i) => {
        return (
            <tr key={i}>
                <td>{i}</td>
                <td>{item.Type}</td>
                <td>{item.Company}</td>
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
                <td>{item.Company}</td>
                <td>{item.Email}</td>
                <td>{item.Phone}</td>
                <td>{item.FAX}</td>
                <td>
                    <PopupEditCustomer/>
                </td>
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