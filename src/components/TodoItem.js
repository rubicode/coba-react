import { useState } from "react";
import { useCustomContext } from "./CustomContext";
import { removeTodo, resendTodo, updateTodo } from "../actions/todos";

export default function TodoItem({ no, todo }) {
    const { todoDispatch } = useCustomContext();

    const [onEdit, setOnEdit] = useState(false)
    const [title, setTitle] = useState(todo.title)
    const [complete, setComplete] = useState(todo.complete)

    if (todo.sent) {
        if (onEdit) {
            return (
                <tr>
                    <td>{no}</td>
                    <td>
                        <input
                            className="form-control"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </td>
                    <td>
                        <select
                            className="form-control"
                            value={complete}
                            onChange={e => setComplete(JSON.parse(e.target.value))}
                        >
                            <option value={false}>Belum</option>
                            <option value={true}>Sudah</option>
                        </select>
                    </td>
                    <td>
                        <button className="btn btn-primary" type="button" onClick={() => { updateTodo(todoDispatch, todo._id, title, complete); setOnEdit(false) }}>save</button>
                        <button className="btn btn-warning" type="button" onClick={() => setOnEdit(false)}>cancel</button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{no}</td>
                    <td>{todo.title}</td>
                    <td>{todo.complete ? 'sudah' : 'belum'}</td>
                    <td>
                        <button className="btn btn-success" type="button" onClick={() => setOnEdit(true)}>Edit</button>
                        <button className="btn btn-danger" type="button" onClick={() => removeTodo(todoDispatch, todo._id)}>Hapus</button>
                    </td>
                </tr>
            )
        }
    } else {
        return (
            <tr>
                <td>{no}</td>
                <td>{todo.title}</td>
                <td>{todo.complete ? 'sudah' : 'belum'}</td>
                <td>
                    <button className="btn btn-warning" type="button" onClick={() => resendTodo(todoDispatch, todo)}>resend</button>
                </td>
            </tr>
        )
    }
}
