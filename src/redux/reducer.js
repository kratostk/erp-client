import initState from './datas'

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "AUTH":
            console.log(action)
            return {
                ...state,
                user: {
                    isAuth: state.user.isAuth = true,
                    data: state.user.data = action.payload
                }
            }
        case "UNAUTH":
            return {
                ...state,
                isAuth: state.isAuth = false
            }
        case "SET_CONTACTS":
            return {
                ...state,
                masterDatas: {
                    ...state.masterDatas,
                    contact: state.masterDatas.contact = action.payload
                }
            }
        case "UPDATE_CONTACT":
            console.log(action)
            return {
                ...state,
                masterDatas: {
                    ...state.masterDatas,
                    contact: [...state.masterDatas.contact, action.payload]
                }
            }
        case "SET_CUSTOMERS":
            return {
                ...state,
                masterDatas: {
                    ...state.masterDatas,
                    customer: state.masterDatas.customer = action.payload
                }
            }
        case "UPDATE_CUSTOMER":
            console.log(action)
            return {
                ...state,
                masterDatas: {
                    ...state.masterDatas,
                    customer: [...state.masterDatas.customer, action.payload]
                }
            }
        case "SET_ADDRESSES":
            return {
                ...state,
                masterDatas: {
                    ...state.masterDatas,
                    address: state.masterDatas.address = action.payload
                }
            }
        case "OPENCUSTOMERMODAL":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    customer: state.modals.customer = true 
                }
            };
        case "CLOSECUSTOMERMODAL":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    customer: state.modals.customer = false 
                }
            };
        case "OPENCONTACTMODAL":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    contact: state.modals.contact = true 
                }
            };
        case "CLOSECONTACTMODAL":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    contact: state.modals.contact = false 
                }
            };
        case "OPENADDRESSMODAL":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    address: state.modals.contact = true 
                }
            };
        case "CLOSEADDRESSMODAL":
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

export default reducer;