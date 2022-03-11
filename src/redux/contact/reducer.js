const contact = null

const contactReducer = (state = contact, action) => {
    switch (action.type) {
        case 'SET_CONTACT':
            return {
                ...state,

            }
    
        default:
            return state
    }
}

export default contactReducer
