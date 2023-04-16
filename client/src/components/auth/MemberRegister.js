import React, { useEffect, useRef, useState } from "react"
import { registerTastes } from '../../managers/TasteManager'
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const MemberRegister = ({ handleModal }) => {

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
                navigate("/")
                handleModal() // close the modal
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
                    {(!uploadClicked && !image) ? (
                    null // show nothing
                ) : (
                    (!uploadClicked && image) ? (
                        <div className="login-placeholder-icon">
                            <i className="upload-icon"></i>
                        </div> // show the icon when choose file is clicked
                    ) : (
                        <>
                            {loading ? (
                                <div className="loading-bar">
                                    <div className="loading-progress"></div>
                                </div>
                            ) : (
                                <img className='login-uploaded-image' src={image} /> // show the image when the upload button is clicked
                            )}
                        </>
                    )
                )}
                <label
                    htmlFor="image_url"
                    className="login-custom-file-upload"
                >Choose file</label>
                <input
                    name="image_url"
                    id="image_url"
                    required autoFocus
                    type="file"
                    onChange={(event) => {
                        setImage(event.target.files[0])
                        setUploadClicked(false)
                    }}
                />
                {!uploadClicked && (
                    <button className="button small" onClick={uploadImage}>Upload image</button>
                )}
                    </div>
                </fieldset>

                <fieldset>
                    <input onChange={updateMember}
                        type="text" id="first_name"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>

                <fieldset>
                    <input onChange={updateMember}
                        type="text" id="last_name"
                        placeholder="Last name"
                        required />
                </fieldset>

                <fieldset>
                    <input onChange={updateMember}
                        type="text"
                        id="username"
                        placeholder="Username"
                        required />
                </fieldset>

                <fieldset>
                    <input onChange={updateMember}
                        type="email"
                        id="email"
                        placeholder="Email"
                        required />
                </fieldset>

                <fieldset>
                    <input onChange={updateMember}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required />
                </fieldset>

                <fieldset>
                    <textarea onChange={updateMember}
                        aria-label="empty textarea"
                        placeholder="A short bio"
                        type="text"
                        id="bio"
                        className="bio"
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

