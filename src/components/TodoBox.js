import { useEffect } from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadTodo } from "../actions/todos";
import { useCustomContext } from "./CustomContext";

export default function TodoBox() {
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const { todoDispatch } = useCustomContext();

    useEffect(() => {
        if (!user?.token) {
            console.log('di kick')
            navigate("/");
        }
        loadTodo(todoDispatch, user._id)
    }, [navigate])

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
                <TodoForm />
            </div>
            <hr />
            <TodoList />
            <div className="card-footer">
                <button className="btn btn-danger" type="button" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}