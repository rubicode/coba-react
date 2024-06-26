import { useEffect } from "react";
import TodoItem from "./TodoItem"
import { useDispatch, useSelector } from "react-redux";
import { loadTodoAsync, selectTodos } from "./todosSlice";
import { selectUser } from "../users/userSlice";

export default function TodoList() {

    const todos = useSelector(selectTodos)
    const user = useSelector(selectUser)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTodoAsync(user._id))
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