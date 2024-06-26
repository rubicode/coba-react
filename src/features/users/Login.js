import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectUser } from "./userSlice";


export default function Login() {

    const [user, setUser] = useState({ email: '', password: '' })
    const userData = useSelector(selectUser)

    const dispatch = useDispatch()

    const submit = async (e) => {
        e.preventDefault()
        dispatch(loginUser(user));
    }

    return (
        <div className="container">
            {userData.token && (<Navigate to="/todos" replace={true} />)}
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