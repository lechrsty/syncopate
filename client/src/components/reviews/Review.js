import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "./Review.css"

export const Review = ({ review, onDelete }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to remove this review?")) {
            window.alert("Review removed from the ether.")
            onDelete(review.id)
        }
    }

    return (

        <div key={`review--${review.id}`} className="card" sx={{ maxWidth: 300 }}>
            <div className="imgBx">
                <a href={`/reviews/${review.id}`}>
                    <img
                        src={review?.image_url} />
                </a>

                <Link to={`/reviews/${review.id}`} className="card-link">
                    <h2 className='title'>{review.title}</h2>
                </Link>
                <p className='artist'> {review?.artist} </p>
                <p> {review?.description.slice(0, 250)}... </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className='genre' style={{ alignSelf: 'flex-start' }}>{review?.genre?.type}</p>
                    <Link to={`/profile/member/${review.member.id}`}>
                        <p className='username' style={{ alignSelf: 'flex-end' }}>{review.member.username}</p>
                    </Link>
                </div>
                <p className='rating'> {review?.rating?.rating}</p>

                <div className="button-row">
                    {
                        review.member.id === JSON.parse(localStorage.getItem('vinylcut')).member
                            ?
                            <>
                                <button onClick={() => {
                                    navigate(`/reviews/edit/${review.id}`)
                                }}><span>Edit</span></button>
                                <button
                                    onClick={handleDelete}
                                ><span>Delete</span></button>
                            </>
                            :
                            ""
                    }
                </div>
            </div>
        </div>
    )
}