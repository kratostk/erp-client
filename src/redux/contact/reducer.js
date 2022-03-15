const initState = {
    contacts: {
        isLoading: false,
        error: null,
        data: null
    }
}

const contactReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_CONTACTS":
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    isLoading: false,
                    error: null,
                    data: state.contacts.data = action.payload
                }
            }
        case "ADD_CONTACT":
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    isLoading: false,
                    error: null,
                    data: [ ...state.contacts.data, action.payload ]
                }
            }
        default:
            return state;
    }
}

export default contactReducer;
