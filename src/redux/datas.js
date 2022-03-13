const initState = {
    isAuth: false,
    user: {
        isAuth: false,
        data: null
    },
    masterDatas: {
        customer: null,
        contact: null,
        address: null
    },
    masterDataRelation: {
        customerContact: null,
        customerAddress: null
    },
    modals: {
        customer: false,
        address: false,
        contact: false
    }
}

export default initState;