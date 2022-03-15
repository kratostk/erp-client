import axios from '../../apis/api'
import { set_customers, add_customer } from './actionTypes'

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
                    Type: inputCustomerData.CustomerType,
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