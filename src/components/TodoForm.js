import { useState } from "react"

export default function TodoForm({ add }) {
    const [title, setTitle] = useState('')

    const submit = (e) => {
        e.preventDefault()
        add(title)
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