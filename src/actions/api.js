import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000
});

export const setToken = token => {
    api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};


try {
    const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).token
    if (token) {
        setToken(token)
    }
} catch (e) {
    console.log('token not found')
}

