const initState = {
    user: {
        isAuth: false,
        data: null
    },
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "AUTH":
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
        default:
            return state;
    }
}

export default userReducer