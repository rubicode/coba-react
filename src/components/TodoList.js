import { useCustomContext } from "./CustomContext";
import TodoItem from "./TodoItem"

export default function TodoList() {
    const { todoState } = useCustomContext();

    console.log('list',todoState)

    const nodeList = todoState.map(
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