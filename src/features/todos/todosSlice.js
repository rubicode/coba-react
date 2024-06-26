import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { load, add, remove, update } from './todosAPI'

const initialState = {
    value: [],
    status: 'idle'
}

export const loadTodoAsync = createAsyncThunk(
    'todos/load',
    async executor => {
        const response = await load(executor)
        return response.data.todos
    }
)

export const addTodoAsync = createAsyncThunk(
    'todos/add',
    async ({_id, title, executor}) => {
        const response = await add(title, executor)
        return { _id, todo: response.data }
    }
)

export const resendTodoAsync = createAsyncThunk(
    'todos/resend',
    async ({_id, title, executor}) => {
        const response = await add(title, executor)
        return { _id, todo: response.data }
    }
)

export const removeTodoAsync = createAsyncThunk(
    'todos/remove',
    async _id => {
        const response = await remove(_id)
        return response.data
    }
)

export const updateTodoAsync = createAsyncThunk(
    'todos/update',
    async ({_id, title, complete}) => {
        const response = await update(_id, title, complete)
        return response.data
    }
)

export const todosSlice = createSlice({
    name: 'todos',
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
            .addCase(loadTodoAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(loadTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = action.payload.map(item => {
                    item.sent = true
                    return item
                })
            })
            .addCase(loadTodoAsync.rejected, state => {
                state.status = 'idle'
                state.value = []
            })
            .addCase(addTodoAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.map(item => {
                    if (item._id === action.payload._id) {
                        item._id = action.payload.todo._id
                    }
                    return item
                })
            }).addCase(addTodoAsync.rejected, (state, action) => {
                state.status = 'idle'
                state.value = state.value.map(item => {
                    if (item._id === action.payload._id) {
                        item.sent = false
                    }
                    return item
                })
            })
            .addCase(resendTodoAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(resendTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.map(item => {
                    if (item._id === action.payload._id) {
                        item._id = action.payload.todo._id
                        item.sent = true
                    }
                    return item
                })
            })
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.filter(todo => todo._id !== action.payload._id)
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.map(todo => {
                    if (todo._id === action.payload._id) {
                        todo.title = action.payload.title
                        todo.complete = action.payload.complete
                    }
                    return todo
                })
            })
    }
})

export const { addTodo } = todosSlice.actions

export const selectTodos = state => state.todos.value

export const createTodo = (title, executor) => dispatch => {
    const _id = Date.now().toString()
    dispatch(addTodo({ _id, title, executor }))
    dispatch(addTodoAsync({_id, title, executor}))
}

export default todosSlice.reducer