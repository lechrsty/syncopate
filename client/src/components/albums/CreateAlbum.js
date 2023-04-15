import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getGenres } from '../../managers/GenreManager'
import { getTastes } from '../../managers/TasteManager'
import { createAlbum } from "../../managers/AlbumManager"

export const CreateAlbum = () => {

    const navigate = useNavigate()

    // Initialize and set state for Album
    const [album, setAlbum] = useState({
        title: "",
        artist: "",
        description: "",
        genre: null,
        taste: null,
        image_url: ""
    })

    // Initialize and set state for Genre dropdown
    const [genreDropdown, setGenreDropdown] = useState([])

    useEffect(
        () => { getGenres().then(setGenreDropdown) }, []
    )

    // Initialize and set state for Taste dropdown
    const [tasteDropdown, setTasteDropdown] = useState([])

    useEffect(
        () => { getTastes().then(setTasteDropdown) }, []
    )

    // Handle input changes
    const handleInputChange = (event) => {
        const copyOfAlbum = { ...album }
        copyOfAlbum[event.target.id] = event.target.value
        setAlbum(copyOfAlbum)
    }

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

    // POST new album
    const handleSubmit = (event) => {

        event.preventDefault();

        if (album.title === "") {
            alert("You need a title.")
        } else if (album.artist === "") {
            alert("You need an artist.")
        } else if (album.description === "") {
            alert("You need a description.")
        } else if (album.genre === "") {
            alert("You need to select a genre.")
        } else if (album.taste === "") {
            alert("You need to select a taste.")
        } else {
            createAlbum(album, image)
                .then(() => {
                    navigate('/dashboard')
                })
        }
    }

    return (
        <div>
            <h2>Drop an album</h2>

            <div>
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <img src={image} />
                )}
                <input name="image_url" id="image_url" required autoFocus
                    type="file"
                    onChange={(event) => {
                        setImage(event.target.files[0])
                        setUploadClicked(false)
                    }} />
                {!uploadClicked && (
                    <button onClick={uploadImage}>Upload image</button>
                )}
            </div>

            <div>
                <input type="text" name="title" id="title" required autoFocus
                    placeholder="Album"
                    defaultValue={album.title}
                    onChange={handleInputChange} />
            </div>

            <div>
                <input type="text" name="artist" id="artist" required autoFocus
                    placeholder="Artist"
                    defaultValue={album.artist}
                    onChange={handleInputChange} />
            </div>

            <div>
                <textarea
                    name="description"
                    id="description"
                    required
                    autoFocus
                    placeholder="Leave a description"
                    defaultValue={album.description}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <select name="genre" id="genre" onChange={(handleInputChange)} >
                    <option value="0">Genre</option>
                    {genreDropdown.map(genre => (
                        <option key={`genre--${genre.id}`} value={genre?.id}>
                            {genre?.type}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <select name="taste" id="taste" onChange={(handleInputChange)} >
                    <option value="0">Taste Category</option>
                    {tasteDropdown.map(taste => (
                        <option key={`taste--${taste.id}`} value={taste?.id}>
                            {taste?.type}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit"
                onClick={handleSubmit}
            >Submit
            </button>
        </div>
    )
}
