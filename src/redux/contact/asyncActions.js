import axios from '../../apis/api'
import { set_contacts, add_contact, update_contact, delete_contact } from './actionTypes'

export const getContacts = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get('api/contact', { withCredentials: true })
            .then(res => {
                dispatch({ type: set_contacts, payload: res.data.recordset })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

export const addContact = ( inputContactData ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post('api/contact', inputContactData, { withCredentials: true })
            .then(res => {
                const { output_id } = res.data.data;
                const contactConstants = {
                    Name: inputContactData.ContactName,
                    Type: inputContactData.ContactType,
                    Phone: inputContactData.ContactPhone,
                    Email: inputContactData.ContactEmail,
                    FAX: inputContactData.ContactFAX,
                    IdMasterData: output_id
                }
                dispatch({ type: add_contact, payload: contactConstants })
                resolve(contactConstants)
            })
            .catch(err => reject(err))
        })
    }
}

export const updateContact = ( inputContactData ) => {
    const contactConstants = {
        Name: inputContactData.ContactName,
        Type: inputContactData.ContactType,
        Phone: inputContactData.ContactPhone,
        Email: inputContactData.ContactEmail,
        FAX: inputContactData.ContactFAX
    }
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`api/contact/${ inputContactData.IdMasterData }`, contactConstants, { withCredentials: true })
            .then(res => {
                
                dispatch({ type: update_contact, payload: {...contactConstants, IdMasterData: inputContactData.IdMasterData} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

export const deleteContact = ( id ) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`api/contact/${ id }`, { withCredentials: true })
            .then(res => {
                
                dispatch({ type: delete_contact, payload: id })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}