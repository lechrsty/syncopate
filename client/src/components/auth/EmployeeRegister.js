import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Login.css"

export const EmployeeRegister = (props) => {
    const [employee, setEmployee] = useState({ "account_type": "employee" })
    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const navigate = useNavigate()

    // State for Employee code
    const [expectedCode, setExpectedCode] = useState("123")

    // State for entered Employee code
    const [employeeCode, setEmployeeCode] = useState("")


    // Cloudinary image upload
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)


    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "vinylcut")
        setLoading(true)


        // Make Axios post request
        axios
            .post("https://api.cloudinary.com/v1_1/dmilofp0z/image/upload", formData)
            .then((response) => {
                setImage(response.data.secure_url)
                setLoading(false)
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        // Check to see if inputted code is correct
        if (employeeCode.toLowerCase() !== expectedCode.toLowerCase()) {
            setFeedback("Invalid code. Please enter the correct code to register.")
            return
        }

        const updatedEmployee = { ...employee, image_url: image }

        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEmployee)

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
                navigate("/login")
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

    const updateEmployee = (evt) => {
        const copy = { ...employee }
        copy[evt.target.id] = evt.target.value
        setEmployee(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{serverFeedback}</div>
                <button className="button--close"
                    onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Welcome to the team</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateEmployee}
                        type="text" id="first_name" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateEmployee}
                        type="text" id="last_name" className="form-control"
                        placeholder="Enter your last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateEmployee}
                        type="text" id="username" className="form-control"
                        placeholder="Enter your username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input onChange={updateEmployee}
                        type="text"
                        id="bio"
                        className="form-control"
                        placeholder="Bio" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateEmployee}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateEmployee}
                        type="password"
                        id="password"
                        className="form-control" required />
                </fieldset>

                <fieldset>
                        <div className="form-box center-elements">
                            <input
                                type="file"
                                id="image_url"
                                className="form-control"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            {loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                <img src={image} style={{ width: '200px' }} />
                            )}
                            <button type="button" onClick={uploadImage}>
                                Upload Image
                            </button>
                        </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="employeeCode"> Employee Code </label>
                    <input type="text" id="employeeCode" className="form-control" required value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value.trim())} />
                </fieldset>

                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

