export default function todosReducer(state = [], action) {
    switch (action.type) {
        case 'LOAD_TODO':
            return action.todos.map(item => {
                item.sent = true
                return item
            })

        case 'ADD_TODO':
            return [
                {
                    _id: action._id,
                    title: action.title,
                    complete: false,
                    executor: action.executor,
                    sent: true
                },
                ...state
            ]

        case 'ADD_TODO_SUCCESS':
            return state.map(item => {
                if (item._id === action.oldId) {
                    item._id = action.newId
                }
                return item
            })

        case 'ADD_TODO_FAILED':
            return state.map(item => {
                if (item._id === action._id) {
                    item.sent = false
                }
                return item
            })

        case 'RESEND_TODO':
            return state.map(item => {
                if (item._id === action.oldId) {
                    item._id = action.newId
                    item.sent = true
                }
                return item
            })
        case 'REMOVE_TODO':
            return state.filter(todo => todo._id !== action._id)
        case 'UPDATE_TODO':
            return state.map(todo => {
                if (todo._id === action._id) {
                    todo.title = action.title
                    todo.complete = action.complete
                }
                return todo
            })
        case 'LOAD_TODO_FAILED':
        case 'UPDATE_TODO_FAILED':
        default:
            return state

    }
}

