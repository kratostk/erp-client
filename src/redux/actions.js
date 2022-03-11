import { 
    OpenCustomerModal, 
    CloseCustomerModal, 
    OpenContactModal, 
    CloseContactModal,
    OpenAddressModal,
    CloseAddressModal,
    Authenticated,
    Unauthenticated
} from './actionTypes'

export function openCustomerModal() {
    console.log('action customer')
    return {
        type: OpenCustomerModal,
        payload: true
    }
}

export function closeCustomerModal() {
    return {
        type: CloseCustomerModal,
        payload: false
    }
}
export function openContactModal() {
    console.log('action contact')
    return {
        type: OpenContactModal,
        payload: true
    }
}
export function closeContactModal() {
    return {
        type: CloseContactModal,
        payload: false
    }
}
export function openAddressModal() {
    return {
        type: OpenAddressModal,
        payload: true
    }
}
export function closeAddressModal() {
    return {
        type: OpenAddressModal,
        payload: false
    }
}

export function authenticated(data) {
    console.log('user authenticated')
    return {
        type: Authenticated,
        payload: data
    }
}
export function unauthenticated() {
    return {
        type: Unauthenticated,
        payload: false
    }
}