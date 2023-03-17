import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteAlbum, getAlbumsByTasteId } from '../../managers/AlbumManager'
import { Album } from './Album'
import Button from '@mui/material/Button'
import './Album.css'

export const TasteAlbumList = ({ tasteId }) => {

    const navigate = useNavigate()
    const [albums, setAlbums] = useState([])

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
            <article className="album-list-container">
                <Button
                    className="button"
                    variant="contained"
                    onClick={() => {
                        navigate(`/upload`)
                    }}
                >
                    Drop an Album
                </Button>

                {albums.map((album) => {
                    return (
                        <Album onDelete={handleDelete} album={album} key={`album--${album.id}`} />
                    )
                })}
            </article>
        </>
    );
};
