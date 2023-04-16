
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = ({ handleModal }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const existDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
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
                    window.location.href = window.location.href
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main>
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <div>
                <form onSubmit={handleLogin}>
                    <h2>Welcome back</h2>
                    <fieldset>
                        <input type="email" id="inputEmail"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input type="password" id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </div>
        </main>
    )
}


