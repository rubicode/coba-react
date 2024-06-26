import TodoForm from "../containers/TodoForm"
import TodoList from "../containers/TodoList"
import { Navigate } from "react-router-dom";
import { logout } from "../actions/users";
import { useDispatch, useSelector } from "react-redux";

export default function TodoBox() {
    const user = useSelector((state) => state.user)

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
                <button className="btn btn-danger" type="button" onClick={() => dispatch(logout())}>Logout</button>
            </div>
        </div>
    )
}