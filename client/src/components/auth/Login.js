
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom"
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
                navigate("/")
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
                    <h1>Vinyl Cut</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email" id="inputEmail"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password" id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
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
            <div className="loginLinks">
                <section className="link--register">
                    <Link to="/registerMember">Member Register</Link>
                </section>
                <section className="link--register">
                    <Link to="/registerEmployee">Employee Register</Link>
                </section>
            </div>
        </main>
    )
}






// import { useRef, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { loginUser } from "../../managers/AuthManager"

// export const Login = ({ setToken }) => {
//     const username = useRef()
//     const password = useRef()
//     const navigate = useNavigate()
//     const [isUnsuccessful, setisUnsuccessful] = useState(false)

//     const handleLogin = (e) => {
//         e.preventDefault()

//         const user = {
//             username: username.current.value,
//             password: password.current.value
//         }

//         loginUser(user).then(res => {
//             if ("valid" in res && res.valid) {
//                 localStorage.setItem("vinylcut_user", JSON.stringify({
//                     id: user.id,
//                     staff: user.isStaff
//                 }))
//                 setToken(res.token)
//                 navigate("/")
//             }
//             else {
//                 setisUnsuccessful(true)
//             }
//         })
//     }