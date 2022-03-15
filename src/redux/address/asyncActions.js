import axios from '../../apis/api'
import { set_addresses, add_address } from './actionTypes'

export const getAddresses = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get('api/address', { withCredentials: true })
            .then(res => {
                dispatch({ type: set_addresses, payload: res.data.recordset })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

export const addAddress = ( inputAddressData ) => {
    return dispatch => {
        return new Promise(( resolve, reject ) => {
            axios.post('api/address', inputAddressData, { withCredentials: true })
            .then(res => {
                const { output_id } = res.data.data;
                const addressConstants = {
                    Name: inputAddressData.AddressName,
                    Type: inputAddressData.AddressType,
                    Description: inputAddressData.AddressDescription,
                    Number: inputAddressData.AddressNumber,
                    Building: inputAddressData.AddressBuilding,
                    SubDistrict: inputAddressData.AddressSubDistrict,
                    District: inputAddressData.AddressDistrict,
                    Province: inputAddressData.AddressProvince,
                    PostalCode: inputAddressData.AddressPostalCode,
                    IdMasterData: output_id
                }
                dispatch({ type:  add_address, payload: addressConstants})
                resolve(addressConstants)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}