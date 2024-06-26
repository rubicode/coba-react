import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../users/userSlice";

export default function TodoBox() {
    const user = useSelector(selectUser)

    const dispatch = useDispatch()

    return (
        <div className="card">
            {!user.token && (<Navigate to="/" replace={true} />)}
            <div className="card-header text-center">
                <h1>Todo List</h1>
            </div>
            <div className="card-body">
                <TodoForm />
            </div>
            <hr />
            <TodoList />
            <div className="card-footer">
                <button className="btn btn-danger" type="button" onClick={() => dispatch(logoutUser())}>Logout</button>
            </div>
        </div>
    )
}