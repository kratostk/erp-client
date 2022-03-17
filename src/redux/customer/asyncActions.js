import axios from '../../apis/api'
import { set_customers, add_customer, update_customer, delete_customer } from './actionTypes'

export const getCustomers = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get('api/customer', { withCredentials: true })
            .then(res => {
                dispatch({ type: set_customers, payload: res.data.recordset })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

export const addCustomer = ( inputCustomerData ) => {
    return dispatch => {
        return new Promise(( resolve, reject ) => {
            axios.post('api/customer', inputCustomerData, { withCredentials: true })
            .then(res => {
                const { output_id } = res.data.data;
                const customerConstants = {
                    Customer_Type: inputCustomerData.CustomerType,
                    Company: inputCustomerData.CustomerName,
                    Phone: inputCustomerData.CustomerPhone,
                    Email: inputCustomerData.CustomerEmail,
                    FAX: inputCustomerData.CustomerFAX,
                    IdMasterData: output_id
                }
                dispatch({ type: add_customer, payload: customerConstants })
                resolve(customerConstants)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

export const updateCustomer = ( inputContactData ) => {
    const contactConstants = {
        Customer_Type: inputContactData.CustomerType,
        Company: inputContactData.CustomerName,
        Type: inputContactData.CustomerType,
        Phone: inputContactData.CustomerPhone,
        Email: inputContactData.CustomerEmail,
        FAX: inputContactData.CustomerFAX
    }
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`api/customer/${ inputContactData.IdMasterData }`, contactConstants, { withCredentials: true })
            .then(res => {
                
                dispatch({ type: update_customer, payload: {...contactConstants, IdMasterData: inputContactData.IdMasterData} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

export const deleteCustomer = ( id ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`api/customer/${ id }`, { withCredentials: true })
            .then(res => {
                
                dispatch({ type: delete_customer, payload: id })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}