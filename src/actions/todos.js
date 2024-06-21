import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'));

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { "Authorization": `Bearer ${user?.token}` }
});

export const loadTodo = async (dispatch, executor) => {
    console.log('jalan', executor)
    try {
        const { data } = await request.get('todos', {
            params: {
                executor
            }
        })
        console.log('jalan', executor)
        dispatch({ type: 'LOAD_TODO', todos: data.todos })
    } catch (error) {
        console.log(error)
        alert('gagal load data')
    }
}

export const addTodo = async (dispatch, title, executor) => {
    const _id = Date.now().toString()
    try {
        dispatch({
            type: 'ADD_TODO',
            _id,
            title,
            executor
        })
        const { data } = await request.post('todos', {
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

export const resendTodo = async (dispatch, { _id, title, executor }) => {
    try {
        const { data } = await request.post('todos', {
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

export const removeTodo = async (dispatch, _id) => {
    try {
        const { data } = await request.delete(`todos/${_id}`)
        dispatch({
            type: 'REMOVE_TODO',
            _id: data._id
        })
    } catch (error) {
        console.log(error)
        alert('gagal hapus data')
    }
}

export const updateTodo = async (dispatch, _id, title, complete) => {
    try {
        const { data } = await request.put(`todos/${_id}`, {
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
        alert('gagal update data')
    }

}