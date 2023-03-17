import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = () => {
    const [member, setMember] = useState(
            { 
                "account_type": "member",
                "taste": null 
            }
        )

    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                return res.json().then((json) => {
                    throw new Error(JSON.stringify(json))
                });
            })
            .then(createdUser => {
                localStorage.setItem("vinylcut", JSON.stringify(createdUser))
                navigate("/home")
            })
            .catch(error => {
                setFeedback(JSON.parse(error.message).message)
            })
    }

    useEffect(() => {
        if (serverFeedback !== "") {
            conflictDialog.current.showModal()
        }
    }, [serverFeedback])

    const updateMember = (evt) => {
        const copy = { ...member }
        copy[evt.target.id] = evt.target.value
        setMember(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{ serverFeedback }</div>
                <button className="button--close"
                    onClick={e => {
                        conflictDialog.current.close()
                        setFeedback("")
                    }}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register New Account</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateMember}
                        type="text" id="first_name"
                        className="form-control" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateMember}
                        type="text" id="last_name"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateMember}
                        type="text"
                        id="username"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email </label>
                    <input onChange={updateMember}
                        type="email"
                        id="email"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateMember}
                        type="password"
                        id="password"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input onChange={updateMember}
                        type="text"
                        id="bio"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="image_url"> Profile Image </label>
                    <input onChange={updateMember}
                        type="text"
                        id="image_url"
                        className="form-control" required />
                </fieldset>

                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

