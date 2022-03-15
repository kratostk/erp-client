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
        default:
            return state;
    }
}

export default addressReducer;