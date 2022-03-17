const initState = {
    addresses: {
        isLoading: false,
        error: null,
        data: null
    }
}

const addressReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_ADDRESSES":
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    isLoading: false,
                    error: null,
                    data: state.addresses.data = action.payload
                }
            }
        case "ADD_ADDRESS":
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    isLoading: false,
                    error: null,
                    data: [ ...state.addresses.data, action.payload ]
                }
            }
        case "UPDATE_ADDRESS":
            return {
                ...state,
                addresses: {
                    ...state.contacts,
                    data: state.addresses.data.map((item) => item.IdMasterData === action.payload.IdMasterData ? action.payload : item)
                }
            }
        case "DELETE_ADDRESS":
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    data: state.addresses.data.filter((item) => item.IdMasterData !== action.payload)
                }
            }
        default:
            return state;
    }
}

export default addressReducer;