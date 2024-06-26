import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, logout } from './usersAPI'
import { setToken } from '../../api'

const initialState = {
    value: {
        _id: null,
        email: null,
        name: null,
        token: null
    },
    status: 'idle'
}

export const loginAsync = createAsyncThunk(
    'user/login',
    async ({ email, password }) => {
        const response = await login(email, password)
        setToken(response.data.token)
        return response.data
    }
)

export const logoutAsync = createAsyncThunk(
    'user/logout',
    async () => {
        const response = await logout()
        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.value.unshift({
                _id: action.payload._id,
                title: action.payload.title,
                complete: false,
                executor: action.payload.executor,
                sent: true
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = action.payload
            })
            .addCase(loginAsync.rejected, state => {
                state.status = 'idle'
                state.value = initialState.value
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = initialState.value
            })
    }
})

export const selectUser = state => state.user.value

export const loginUser = ({ email, password }) => (dispatch, getState) => {
    dispatch(loginAsync({ email, password }))
    const currentValue = selectUser(getState())
    console.log(currentValue)
}

export const logoutUser = () => dispatch => {
    dispatch(logoutAsync())
    setToken(null)
}

export default userSlice.reducer