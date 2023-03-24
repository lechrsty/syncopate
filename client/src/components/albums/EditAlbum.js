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
import "../reviews/Review.css"



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
            .then(() => navigate(`/albums/${album.id}`))
    }


    return (
        <article className="create-review-list-container">
            <Card className="reviewForm" sx={{ maxWidth: 800, padding: 5 }}>
                <CardContent>
                    <Stack spacing={2}>

                        <h2 >EDIT ALBUM</h2>

                        <div className="create-title">
                            <label htmlFor="title">Album Title: </label>
                            <input type="text" name="title" required autoFocus 

                                defaultValue={album.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="create-artist">
                            <label htmlFor="artist">Album Artist: </label>
                            <input type="text" name="artist" required autoFocus 

                                defaultValue={album.artist}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='create-text'>
                            <textarea
                                name="description"
                                id="description"
                                required
                                autoFocus
                                defaultValue={album.description}
                                onChange={handleInputChange}
                                style={{ resize: "vertical", minHeight: "50px", minWidth:"300px" }} 
                            />
                        </div>

                        <div className="create-genre">
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

                        <div className="create-rating">
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

                        <button  type="submit"
                            onClick={handleSubmit}
                            className="button"><span>Submit</span>
                        </button>

                    </Stack>
                </CardContent>
            </Card>
        </article>
    )
}