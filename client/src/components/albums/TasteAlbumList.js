import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteAlbum, getAlbumsByTasteId } from '../../managers/AlbumManager'
import { Album } from './Album'
import "./Albums.css"

export const TasteAlbumList = ({ tasteId }) => {

    const navigate = useNavigate()

    const [albums, setAlbums] = useState([])

    // Get localstorage user object to render Edit and Delete buttons for staff only
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    useEffect(() => {
        getAlbumsByTasteId(tasteId).then((albumData) => setAlbums(albumData))
    }, [tasteId])

    const handleDelete = (id) => {
        deleteAlbum(id).then(() => {
            const updatedAlbums = albums.filter((album) => album.id !== id)
            setAlbums(updatedAlbums)
        })
    }

    return (
        <>
            <main className='tasty-content-wrapper'>
                <h2 className='tasty-header'> Tasties</h2>
            </main>
            <div className='list-container'>
                {albums.map((album) => {
                    return (
                        <Album onDelete={handleDelete} album={album} key={`album--${album.id}`} />
                    )
                })}
            </div>
        </>
    )
}
