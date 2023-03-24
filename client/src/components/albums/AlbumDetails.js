import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleAlbum } from "../../managers/AlbumManager"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as React from 'react'
import "./Album.css"

export const AlbumDetails = () => {
    const navigate = useNavigate()

    const { albumId } = useParams()

    const [album, setAlbum] = useState({})

    useEffect(() => {
        getSingleAlbum(albumId).then((data) => setAlbum(data))
    }, [albumId])


    return (
        <div className='album-list-container'>
            <div key={`album--${album.id}`} className="album" sx={{ paddingTop:'-200px', width: 600 }}>
                <div style={{ paddingLeft: '50px' }} className="album-imgBx">
                    <a href={`/albums/${album.id}`}>
                        <img
                            src={album?.image_url} />
                    </a>
                </div>
                <Link to={`/albums/${album.id}`} className="link">
                    <p className='title' style={{ fontSize: '25px', textAlign: 'center', alignContent: 'center', justifyContent: 'center' }}>{album.title}</p>
                </Link>
                <div className='album-contents'>
                    <p className='artist' style={{ textAlign: 'center' }}> {album?.artist} </p>
                    <p className='genre' style={{ fontSize: '17px', textAlign: 'center', color: 'grey' }}> {album?.genre?.type} </p>
                    <p className='genre' style={{ fontSize: '17px', textAlign: 'center', color: 'black' }}> {album?.description} </p>
                </div>
            </div>
        </div>
    )
}