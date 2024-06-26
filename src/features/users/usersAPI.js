import { api } from "../../api";

export const login = (email, password) => api.post('users/signin', {
    email,
    password
})

export const logout = () => api.post('users/signout', {})