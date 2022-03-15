import axios from '../../apis/api'
import { setAddresses } from './actionTypes'

export const getAddresses = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get('api/address', { withCredentials: true })
            .then(res => {
                dispatch({ type: setAddresses, payload: res.data.recordset })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}