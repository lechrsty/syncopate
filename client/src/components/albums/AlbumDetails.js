import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleAlbum } from "../../managers/AlbumManager"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as React from 'react'

export const AlbumDetails = () => {
    const navigate = useNavigate()

    const { albumId } = useParams()

    const [album, setAlbum] = useState({})

    useEffect(() => {
        getSingleAlbum(albumId).then((data) => setAlbum(data))
    }, [albumId])


    return (
        <div key={`album--${album.id}`}>
            <a href={`/albums/${album.id}`}>
                <img
                    src={album?.image_url} />
            </a>
            <Link to={`/albums/${album.id}`}>
                <p>{album.title}</p>
            </Link>
            <p> {album?.artist} </p>
            <p> {album?.genre?.type} </p>
            <p> {album?.description} </p>
        </div>
    )
}