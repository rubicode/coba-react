import { useState } from "react"
import { addTodo } from "../actions/todos";
import { useDispatch, useSelector } from "react-redux";

export default function TodoForm() {
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const submit = (e) => {
        e.preventDefault()
        dispatch(addTodo(title, user._id))
        setTitle('')
    }

    return (
        <form onSubmit={submit}>
            <div className="row mb-3">
                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
            </div>
            <button className="btn btn-primary" type="submit">tambah</button>
        </form>
    )
}