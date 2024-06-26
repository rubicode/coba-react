import { api } from "../../api";

export const load = executor => api.get('todos', {
    params: {
        executor
    }
})

export const add = (title, executor) => api.post('todos', {
    title,
    executor
})

export const remove = _id => api.delete(`todos/${_id}`)

export const update = (_id, title, complete) => api.put(`todos/${_id}`, {
    title,
    complete
})