
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom"
import { TextField } from "@mui/material";
import '../albums/Album.css'
import "./Login.css"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const existDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8000/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.valid) {
                    localStorage.setItem("vinylcut", JSON.stringify(authInfo))
                    navigate("/dashboard")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
        <dialog className="dialog dialog--auth" ref={existDialog}>
            <div>User does not exist</div>
            <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
        </dialog>

        <section>
            <form className="form--login" onSubmit={handleLogin}>
                <h1 style={{ fontSize:'40px', fontStyle:'italic'}}>VINYL CUT</h1>
                <h2 style={{ fontSize:'20px'}}>Welcome back!</h2>
                <fieldset>
                    <input type="email" id="inputEmail"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                        className="form-control"
                        placeholder="Email address"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <input type="password" id="inputPassword"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <button className='button' type="submit">
                        <span>Sign in</span>
                    </button>
                </fieldset>
            </form>
        </section>
        <div className="loginLinks">
            <section className="link--register">
                <Link to="/registerMember">Member Register</Link>
            </section>
            <section className="link--register" style={{ marginRight:'-10px'}}>
                <Link to="/registerEmployee">Employee Register</Link>
            </section>
        </div>
    </main>
    )
}


