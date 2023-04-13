import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleAlbum } from "../../managers/AlbumManager"
import * as React from 'react'
import "./Albums.css"

export const AlbumDetails = () => {

    const { albumId } = useParams()
    const [album, setAlbum] = useState({})

    useEffect(() => {
        getSingleAlbum(albumId).then((data) => setAlbum(data))
    }, [albumId])

    return (
        <>
            <div className='detail-content-container' key={`album--${album.id}`}>
                <div className='detail-wrapper'>

                    <img className='detail-image'
                        src={album?.image_url} />
                    <p className='detail-title'> {album?.title} </p>
                    <p className='detail-artist'>{album.artist}</p>
                    <p className='detail-genre'> {album?.genre?.type} </p>
                </div>
                <div className='description-wrapper'>
                    <p className='detail-description'> {album?.description} </p>
                </div>
            </div>
        </>
    )
}