import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getGenres } from '../../managers/GenreManager'
import { getTastes } from '../../managers/TasteManager'
import { createAlbum } from "../../managers/AlbumManager"
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import "./Album.css"

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

    // Cloudinary image upload
    const [image, setImage] = useState("")

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "vinylcut");

        // Make Axios post request
        axios
            .post("https://api.cloudinary.com/v1_1/dmilofp0z/image/upload", formData)
            .then((response) => {
                console.log(response)
                setImage(response.data.secure_url)
            })
        console.log(image)
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
                    navigate('/home')
                });
        }
    }

    return (
        <article className="create-album-list-container">
            <Card className="albumForm" sx={{ maxWidth: 800, padding: 5 }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5">Drop a Album</Typography>

                        <fieldset>
                            <div className="form-group">
                                <input type="text" name="title" id="title" required autoFocus className="form-control"
                                    placeholder="Album"
                                    defaultValue={album.title}
                                    onChange={handleInputChange} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <input type="text" name="artist" id="artist" required autoFocus className="form-control"
                                    placeholder="Artist"
                                    defaultValue={album.artist}
                                    onChange={handleInputChange} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <input type="text" name="description" id="description" required autoFocus className="form-control"
                                    placeholder="A gut-wrenchingly honest opinion?"
                                    defaultValue={album.description}
                                    onChange={handleInputChange} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <input name="image_url" id="image_url" required autoFocus className="form-control"
                                    type="file"
                                    onChange={(event) => {
                                        setImage(event.target.files[0])
                                    }} />
                                <button onClick={uploadImage}>Upload Image
                                </button>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <select name="genre" id="genre" onChange={(handleInputChange)} >
                                    <option value="0" className="form-style">Genre</option>
                                    {genreDropdown.map(genre => (
                                        <option key={`genre--${genre.id}`} value={genre?.id}>
                                            {genre?.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <select name="taste" id="taste" onChange={(handleInputChange)} >
                                    <option value="0" className="form-style">Taste Category</option>
                                    {tasteDropdown.map(taste => (
                                        <option key={`taste--${taste.id}`} value={taste?.id}>
                                            {taste?.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                        <Button variant="contained" type="submit"
                            onClick={handleSubmit}
                            className="button">Submit Album
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </article>
    )
}
