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
        <div className='tasty-card' key={`album--${album.id}`}>
            <a href={`/albums/${album.id}`}>
                <img className='tasty-image'
                    src={album?.image_url} />
            </a>
            <p className='tasty-title'>
                {album.title.length > 30 ? (
                    <div className="marquee-container">
                        <marquee direction="up" scrollamount="2" height="50px" scrollDelay="0">
                            {[...Array(50)].map((_, i) => (
                                <p className="tasty-title" key={i}>{album.title}</p>
                            ))}
                        </marquee>
                    </div>
                ) : (
                    <p className="tasty-title">{album.title}</p>
                )}
            </p>
            <div className='artist-genre-wrapper'>
                <p className='tasty-artist'> {album?.artist} </p>
                <p className='tasty-genre'> {album?.genre?.type} </p>
            </div>
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
