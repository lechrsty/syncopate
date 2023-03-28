
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

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
        <main>
        <dialog className="dialog dialog--auth" ref={existDialog}>
            <div>User does not exist</div>
            <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
        </dialog>

        <section>
            <form onSubmit={handleLogin}>
                <h1>Vinyl Cut</h1>
                <h2>Welcome back!</h2>
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
        </section>
        <div>
            <section>
                <Link to="/registerMember">Member Register</Link>
            </section>
            <section>
                <Link to="/registerEmployee">Employee Register</Link>
            </section>
        </div>
    </main>
    )
}


