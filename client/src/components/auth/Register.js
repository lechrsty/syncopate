import React, { useEffect, useRef, useState } from "react"
import { registerTastes } from '../../managers/TasteManager'
import { useNavigate } from "react-router-dom"
import axios from "axios"
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
        <main>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{serverFeedback}</div>
                <button className="button--close"
                    onClick={e => {
                        conflictDialog.current.close()
                        setFeedback("")
                    }}>Close</button>
            </dialog>

            <form onSubmit={handleRegister}>
                <h1>Register Member</h1>

                <fieldset>
                    <div>
                        <label htmlFor="image_url"> Profile Image </label>
                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            <img src={image} />
                        )}
                        <input
                            type="file"
                            id="image_url"
                            onChange={(event) => {
                                setImage(event.target.files[0])
                                setUploadClicked(false)
                            }} />
                        {!uploadClicked && (
                            <button onClick={uploadImage}>Upload image</button>
                        )}
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateMember}
                        type="text" id="first_name"
                        required autoFocus />
                </fieldset>

                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateMember}
                        type="text" id="last_name"
                        required />
                </fieldset>

                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateMember}
                        type="text"
                        id="username"
                        required />
                </fieldset>

                <fieldset>
                    <label htmlFor="email"> Email </label>
                    <input onChange={updateMember}
                        type="email"
                        id="email"
                        required />
                </fieldset>

                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateMember}
                        type="password"
                        id="password"
                        required />
                </fieldset>

                <fieldset>
                    <TextareaAutosize onChange={updateMember}
                        aria-label="empty textarea"
                        placeholder="Bio"
                        type="text"
                        id="bio"
                        required />
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <select name="taste" id="taste" onChange={updateMember} >
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
                        Register
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

