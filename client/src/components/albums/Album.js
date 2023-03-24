import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "./Album.css"

export const Album = ({ album, onDelete }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to remove this from inventory?")) {
            window.alert("Album removed from inventory.")
            onDelete(album.id)
        }
    }

    // Get localstorage user object to render Edit and Delete buttons for staff only
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    return (
        <div key={`album--${album.id}`} className="album" sx={{ maxWidth: 300 }}>
            <div style={{ paddingLeft: '50px' }} className="album-imgBx">
                <a href={`/albums/${album.id}`}>
                    <img
                        src={album?.image_url} />
                </a>
            </div>
            <Link to={`/albums/${album.id}`} className="link">
                <p className='title' style={{ fontSize: '25px', textAlign: 'center', alignContent:'center', justifyContent:'center' }}>{album.title}</p>
            </Link>
            <div className='album-contents'>
                <p className='artist' style={{ textAlign: 'center' }}> {album?.artist} </p>
                <p className='genre' style={{ fontSize: '17px', textAlign: 'center', color: 'grey' }}> {album?.genre?.type} </p>
                <div className="button-row">
                    <div className="left-button">
                        {vinylCutUserObject?.staff === true && (
                            <button className="button" variant="contained" onClick={() => {
                                navigate(`/edit/${album.id}`)
                            }}><span>Edit</span></button>
                        )}
                    </div>
                    <div className="right-button">
                        {vinylCutUserObject?.staff === true && (
                            <button className="button" variant="contained" onClick={handleDelete}><span>Delete</span></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
