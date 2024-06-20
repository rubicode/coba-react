import { useState } from "react";

export default function TodoItem({ no, todo, remove, update, resend }) {
    const [onEdit, setOnEdit] = useState(false)
    const [title, setTitle] = useState(todo.title)

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
                    <td>{todo.complete ? 'sudah' : 'belum'}</td>
                    <td>
                        <button className="btn btn-primary" type="button" onClick={() => { update(todo.id, title); setOnEdit(false) }}>save</button>
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
                        <button className="btn btn-danger" type="button" onClick={() => remove(todo._id)}>Hapus</button>
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
                    <button className="btn btn-warning" type="button" onClick={() => resend(todo)}>resend</button>
                </td>
            </tr>
        )
    }
}
