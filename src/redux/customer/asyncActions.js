import axios from '../../apis/api'
import { setCustomers } from './actionTypes'

export const getCustomers = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get('api/customer', { withCredentials: true })
            .then(res => {
                dispatch({ type: setCustomers, payload: res.data.recordset })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}