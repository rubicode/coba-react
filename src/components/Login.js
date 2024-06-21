import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' })

    const submit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:3000/users/signin', user)
            localStorage.setItem('user', JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            navigate("/todos");
        } catch (error) {
            console.log('gagal login', error)
        }

    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header text-center">
                    <h1>Sign In</h1>
                </div>
                <div className="card-body">
                    <form id="login-form" onSubmit={submit}>
                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
                <div className="card-footer text-center">
                    <p>doesn't have a account? please <a href="http://localhost:3000/register">sign up</a></p>
                </div>
            </div>
        </div>
    )
}