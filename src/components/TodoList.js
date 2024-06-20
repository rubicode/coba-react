import TodoItem from "./TodoItem"

export default function TodoList({ data, removeTodo, updateTodo, resendTodo }) {

    const nodeList = data.map(
        (todo, index) => <TodoItem
            key={todo._id}
            no={index + 1}
            todo={todo}
            remove={removeTodo}
            update={updateTodo}
            resend={resendTodo} />
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