import { api, setToken } from "./api";

export const login = ({ email, password }, navigate) => async dispatch => {
    try {
        const { data } = await api.post('users/signin', { email, password })
        setToken(data.token);
        dispatch({ type: 'SET_USER', user: data })
        navigate("/todos");
    } catch (error) {
        console.log(error)
        dispatch({ type: 'SET_USER_FAILED' })
    }
}

export const logout = () => async dispatch => {
    try {
        const { data } = await api.post('users/signout', {})
        dispatch({ type: 'UNSET_USER', user: data })
        setToken(null);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'UNSET_USER_FAILED' })
    }
}