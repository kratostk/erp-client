import api from '../apis/api'

export const authUser = (claimCrednetials) => {
    return async (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                const res = api.get('/', claimCrednetials, {withCredentials: true});
                console.log('thunk', res)
                dispatch({ type: 'AUTH', payload: res.data });
                resolve()
            }catch(err) {
                console.log('thunk', err)
                dispatch({ type: 'UNAUTH', payload: null });
                reject(err.response.data.message)
            }
        })
    }
}