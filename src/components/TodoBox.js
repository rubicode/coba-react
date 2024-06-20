import { useEffect, useState } from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TodoBox() {
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const [todos, setTodos] = useState([])

    useEffect(() => {
        if (!user?.token) {
            console.log('di kick')
            navigate("/");
        }
        loadTodo()
    }, [navigate]) // componentDidUpdate

    const loadTodo = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/todos', {
                params: {
                    executor: user._id
                },
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            setTodos(data.todos.map(item => {
                item.sent = true
                return item
            }))
        } catch (error) {
            console.log(error)
            alert('gagal load data')
        }

    }

    const addTodo = async (title) => {
        const _id = Date.now()
        try {
            setTodos([{ _id, title, complete: false, executor: user._id, sent: true }, ...todos])
            const { data } = await axios.post('http://localhost:3000/todos', {
                title,
                executor: user._id
            }, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            setTodos(todos => (todos.map(item => {
                if (item._id === _id) {
                    item._id = data._id
                }
                return item
            })))
        } catch (error) {
            console.log(error)
            setTodos(todos => (todos.map(item => {
                if (item._id === _id) {
                    item.sent = false
                }
                return item
            })))
        }
    }

    const resendTodo = async ({ _id, title, executor }) => {
        try {
            const { data } = await axios.post('http://localhost:3000/todos', {
                title,
                executor
            }, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            setTodos(todos => (todos.map(item => {
                if (item._id === _id) {
                    item._id = data._id
                    item.sent = true
                }
                return item
            })))
        } catch (error) {
            console.log('gagal resend')
        }
    }

    const removeTodo = async (_id) => {
        try {
            const { data } = await axios.delete(`http://localhost:3000/todos/${_id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            setTodos(todos.filter(todo => todo._id !== data._id))
        } catch (error) {
            console.log(error)
            alert('gagal hapus data')
        }

    }

    const updateTodo = (id, title) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.title = title
            }
            return todo
        }))
    }

    const logout = async () => {
        console.log(user.token)
        try {
            await axios.post('http://localhost:3000/users/signout', {}, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.log(error)
            alert('gagal logout')
        }
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                <h1>Todo List</h1>
            </div>
            <div className="card-body">
                <TodoForm add={addTodo} />
            </div>
            <hr />
            <TodoList data={todos} removeTodo={removeTodo} updateTodo={updateTodo} resendTodo={resendTodo} />
            <div className="card-footer">
                <button className="btn btn-danger" type="button" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}