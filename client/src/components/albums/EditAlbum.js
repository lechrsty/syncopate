import * as React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleAlbum, updateAlbum } from "../../managers/AlbumManager"
import { getGenres } from "../../managers/GenreManager"
import { getTastes } from "../../managers/TasteManager"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import "./Album.css"


export const EditAlbum = () => {

    const navigate = useNavigate()
    const { albumId } = useParams()

    // Initialize and set state for Album
    const [album, setAlbum] = useState({
        title: "",
        artist: "",
        description: "",
        genre: null,
        taste: null,
    })

    useEffect(
        () => { getSingleAlbum(albumId).then(setAlbum) }, []
    )

    // Initialize and set state for Genre dropdown
    const [genreDropdown, setGenreDropdown] = useState([])

    useEffect(
        () => { getGenres().then(setGenreDropdown) }, []
    )

    // Initialize and set state for Taste
    const [tasteDropdown, setTasteDropdown] = useState([])

    useEffect(
        () => { getTastes().then(setTasteDropdown) }, []
    )


    const handleInputChange = (event) => {
        const copyOfAlbum = { ...album }
        copyOfAlbum[event.target.name] = event.target.value
        setAlbum(copyOfAlbum)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        updateAlbum(albumId, album)
            .then(() => navigate(`/albums`))
    }


    return (
        <article className="create-album-list-container">
            <Card className="albumForm" sx={{ maxWidth: 800, padding: 5 }}>
                <CardContent>
                    <Stack spacing={2}>

                        <Typography variant="h5">Edit Album</Typography>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="title">Album Title: </label>
                                <input type="text" name="title" required autoFocus className="form-control"

                                    defaultValue={album.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="artist">Album Artist: </label>
                                <input type="text" name="artist" required autoFocus className="form-control"

                                    defaultValue={album.artist}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Album: </label>
                                <input type="text" name="description" required autoFocus className="form-control"

                                    defaultValue={album.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="genre">Genre </label>
                                <select
                                    className="form-style"
                                    onChange={(evt) => {
                                        const copy = { ...album };
                                        copy.genre = { id: parseInt(evt.target.value) };
                                        setAlbum(copy);
                                    }}
                                >
                                    <option value="">{album?.genre?.type}</option>
                                    {genreDropdown.map((genre) => (
                                        <option key={`genre--${genre.id}`} value={genre.id}>
                                            {genre.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="taste">Taste </label>
                                <select
                                    className="form-style"
                                    value={album?.taste?.id}
                                    onChange={(evt) => {
                                        const copy = { ...album };
                                        copy.taste = { id: parseInt(evt.target.value) };
                                        setAlbum(copy);
                                    }}
                                >
                                    <option value="" disabled={!album?.taste}>
                                        {album?.taste?.type}
                                    </option>
                                    {tasteDropdown.map((taste) => (
                                        <option key={`taste--${taste?.id}`} value={taste?.id}>
                                            {taste?.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                        <Button variant="contained" type="submit"
                            onClick={handleSubmit}
                            className="button">
                            Submit
                        </Button>

                    </Stack>
                </CardContent>
            </Card>
        </article>
    )
}