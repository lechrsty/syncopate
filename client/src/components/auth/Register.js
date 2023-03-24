import React, { useEffect, useRef, useState } from "react"
import { registerTastes } from '../../managers/TasteManager'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./Login.css"
import { TextareaAutosize } from "@mui/material"

export const Register = () => {

    // Initialize and set state for new Member dropdown
    const [member, setMember] = useState(
        {
            "account_type": "member",
            "choice_one": null,
            "choice_two": null,
            "choice_three": null,
            "taste": null
        }
    )

    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const navigate = useNavigate()

    // Initialize and set state for Taste dropdown
    const [tasteDropdown, setTasteDropdown] = useState([])

    useEffect(
        () => { registerTastes().then(setTasteDropdown) }, []
    )

    // State to hide "upload" button if clicked
    const [uploadClicked, setUploadClicked] = useState(false)

    // Cloudinary image upload
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

    const uploadImage = () => {
        setUploadClicked(true)
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
        // Add the "image_url" value to the member object
        const updatedMember = { ...member, image_url: image }

        console.log("Registering with data: ", updatedMember)
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedMember)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                return res.json().then((json) => {
                    throw new Error(JSON.stringify(json))
                })
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

    const updateMember = (evt) => {
        const copy = { ...member }
        copy[evt.target.id] = evt.target.value
        setMember(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{serverFeedback}</div>
                <button className="button--close"
                    onClick={e => {
                        conflictDialog.current.close()
                        setFeedback("")
                    }}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister} style={{padding:'100px'}}>
                <h1 className="h3 mb-3 font-weight-normal">Register Member</h1>

                <fieldset>
                    <div className="form-box center-elements">
                        <label htmlFor="image_url"> Profile Image </label>
                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            <img src={image} style={{ width: '200px', paddingBottom:'20px' }} />
                        )}
                        <input
                            type="file"
                            id="image_url"
                            className="form-control"
                            onChange={(event) => {
                                setImage(event.target.files[0])
                                setUploadClicked(false)
                            }} />
                        {!uploadClicked && (
                            <button onClick={uploadImage} style={{ marginTop: "20px" }}><span>Upload image</span></button>
                        )}
                    </div>
                </fieldset>

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
                    <label htmlFor="email" style={{ marginLeftwidth: "200px" }}> Email </label>
                    <input onChange={updateMember}
                        type="email"
                        id="email"
                        className="form-control" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="password" style={{ width: "200px" }}> Password </label>
                    <input onChange={updateMember}
                        type="password"
                        id="password"
                        className="form-control" required />
                </fieldset>

                <fieldset>
                    <TextareaAutosize onChange={updateMember}
                        aria-label="empty textarea"
                        placeholder="Bio"
                        type="text"
                        id="bio"
                        className="form-control" required />
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <select name="taste" id="taste" onChange={updateMember} style={{ width: "200px" }} >
                            <option value="0">Taste Category</option>
                            {tasteDropdown.map(taste => (
                                <option key={`taste--${taste.id}`} value={taste.id}>
                                    {taste?.type}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <button type="submit" >
                        <span>Register</span> 
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

