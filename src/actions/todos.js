import { api } from "./api"

export const loadTodo = (executor) => async (dispatch, getState) => {
    try {
        const { data } = await api.get('todos', {
            params: {
                executor
            }
        })

        dispatch({ type: 'LOAD_TODO', todos: data.todos })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOAD_TODO_FAILED', todos: getState().todos })
    }
}

export const addTodo = (title, executor) => async dispatch => {
    const _id = Date.now().toString()
    try {
        dispatch({
            type: 'ADD_TODO',
            _id,
            title,
            executor
        })
        const { data } = await api.post('todos', {
            title,
            executor
        })
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            oldId: _id,
            newId: data._id
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'ADD_TODO_FAILED',
            _id
        })
    }
}

export const resendTodo = ({ _id, title, executor }) => async dispatch => {
    try {
        const { data } = await api.post('todos', {
            title,
            executor
        })
        dispatch({
            type: 'RESEND_TODO',
            oldId: _id,
            newId: data._id
        })
    } catch (error) {
        console.log('gagal resend')
    }
}

export const removeTodo = (_id) => async dispatch => {
    try {
        const { data } = await api.delete(`todos/${_id}`)
        dispatch({
            type: 'REMOVE_TODO',
            _id: data._id
        })
    } catch (error) {
        console.log(error)
        alert('gagal hapus data')
    }
}

export const updateTodo = (_id, title, complete) => async dispatch => {
    try {
        const { data } = await api.put(`todos/${_id}`, {
            title,
            complete
        })
        dispatch({
            type: 'UPDATE_TODO',
            _id: data._id,
            title,
            complete
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'UPDATE_TODO_FAILED'
        })
    }

}