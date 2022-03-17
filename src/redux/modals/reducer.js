const initState = {
    modals: {
        customer: false,
        address: false,
        contact: false,
        editContact: false
    }
}

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case "OPEN_CUS":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    customer: state.modals.customer = true 
                }
            };
        case "CLOSE_CUS":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    customer: state.modals.customer = false 
                }
            };
        case "OPEN_CON":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    contact: state.modals.contact = true 
                }
            };
        case "CLOSE_CON":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    contact: state.modals.contact = false 
                }
            };
        case "OPEN_ADD":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    address: state.modals.contact = true 
                }
            };
        case "CLOSE_ADD":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    address: state.modals.contact = false 
                }
            };
        default:
            return state;
    }
}

export default modalReducer