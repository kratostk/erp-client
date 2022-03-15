import { combineReducers } from 'redux'
import customerReducer from './customer/reducer'
import contactReducer from './contact/reducer'
import addressReducer from './address/reducer'
import modalReducer from './modals/reducer'
import userReducer from './user/reducer'
import relationshipReducer from './relationships/reducer'

const rootReducer = combineReducers({
    customers: customerReducer,
    contacts: contactReducer,
    addresses: addressReducer,
    modals: modalReducer,
    user: userReducer,
    relationships: relationshipReducer
})

export default rootReducer