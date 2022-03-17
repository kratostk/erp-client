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
        case "UPDATE_CONTACT":
            console.log(action)
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    data: state.contacts.data.filter((item) => item.IdMaasterData === action.payload.IdMaasterData ? item = action.payload : state.contacts.data)
                }
            }
        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    data: state.contacts.data.filter((item) => item.IdMasterData !== action.payload)
                }
            }
        default:
            return state;
    }
}

export default contactReducer;
