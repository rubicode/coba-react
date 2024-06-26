const initialUser = {
    _id: null,
    email: null,
    name: null,
    token: null
}

export default function userReducer(state = initialUser, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...action.user }
        case 'UNSET_USER':
            return { ...initialUser }
        case 'UNSET_USER_FAILED':
        case 'SET_USER_FAILED':
        default:
            return state
    }
}