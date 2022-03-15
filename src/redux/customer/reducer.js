const initState = {
    customers: {
        isLoading: false,
        error: null,
        data: null
    }
}

const customerReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_CUSTOMERS":
            return {
                ...state,
                customers: {
                    ...state.customers,
                    isLoading: false,
                    error: null,
                    data: state.customers.data = action.payload
                }
            }
        case "UPDATE_CUSTOMER":
            console.log(action)
            return {
                ...state,
                customers: {
                    ...state.customers,
                    isLoading: false,
                    error: null,
                    data: [...state.customers.data, action.payload]
                }
            }
        default:
            return state;
    }
}

export default customerReducer;