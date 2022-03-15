const initState = {
    customerContacts: null,
    customerAddresses: null
}

const relationshipReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_REL':
            return {
                ...state,
                customerContacts: state.customerContacts = action.payload.customerContacts,
                customerAddresses: state.customerAddresses = action.payload.customerAddresses
            }
        case 'UPDATE_REL_CONTACT_CUSTOMER': 
            return {
                ...state,
                customerContacts: [...state.customerContacts, action.payload]
            }
        case 'UPDATE_REL_ADDRESS_CUSTOMER':
            return {
                ...state,
                customerAddresses: [...state.customerAddresses, action.payload]
            }
        default:
            return state;
    }
}

export default relationshipReducer