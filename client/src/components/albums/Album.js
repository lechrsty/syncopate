import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
            <div>
                <div>
                    {vinylCutUserObject?.staff === true && (
                        <button onClick={() => {
                            navigate(`/edit/${album.id}`)
                        }}>Edit</button>
                    )}
                </div>
                <div>
                    {vinylCutUserObject?.staff === true && (
                        <button onClick={handleDelete}>Delete</button>
                    )}
                </div>
            </div>
        </div>
    )
}
