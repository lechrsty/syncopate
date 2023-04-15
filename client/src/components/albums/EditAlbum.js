import * as React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleAlbum, updateAlbum } from "../../managers/AlbumManager"
import { getGenres } from "../../managers/GenreManager"
import { getTastes } from "../../managers/TasteManager"

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
        <div>
            <main className='tasty-content-wrapper'>
                <h2 className='tasty-header'> Edit Album</h2>
            </main>

            <div className='edit-wrapper'>

                <div>
                    <label className="detail-artist padding-right-27 " htmlFor="title">Title </label>
                    <input type="text" name="title" required autoFocus

                        defaultValue={album.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="detail-artist padding-right-10" htmlFor="artist">Artist </label>
                    <input type="text" name="artist" required autoFocus

                        defaultValue={album.artist}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <div className='space-above'></div>
                    <textarea
                        name="description"
                        id="description"
                        required
                        autoFocus
                        defaultValue={album.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <div className='space-above'></div>
                    <label className="detail-artist" htmlFor="genre">Genre </label>
                    <select
                        className="form-style select-genre background-grey"
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

                <div>
                    <label className="detail-artist" htmlFor="taste">Taste </label>
                    <select
                        className="form-style select-genre background-grey"
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
                <div className='space-above'></div>

                <button type="submit"
                    onClick={handleSubmit}
                >Submit
                </button>
            </div>
        </div>
    )
}