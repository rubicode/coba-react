import { useEffect } from "react";
import TodoItem from "./TodoItem"
import { useDispatch, useSelector } from "react-redux";
import { loadTodo } from "../actions/todos";

export default function TodoList() {

    const todos = useSelector((state) => state.todos)
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTodo(user._id))
    }, [dispatch, user])

    const nodeList = todos.map(
        (todo, index) => <TodoItem
            key={todo._id}
            no={index + 1}
            todo={todo}
        />
    )

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Complete</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {nodeList}
            </tbody>
        </table>
    )
}