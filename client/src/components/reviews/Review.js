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

        <div className='review-card' key={`review--${review.id}`}>

            <a href={`/reviews/${review.id}`}>
                <img className='review-image'
                    src={review?.image_url} />
            </a>

            <div className='review-title'>
                {review.title.length > 35 ? (
                    <div className="marquee-container">
                        <marquee direction="up" scrollamount="2" height="50px" scrollDelay="0">
                            {[...Array(50)].map((_, i) => (
                                <Link to={`/reviews/${review.id}`}>
                                    <p className="review-title" key={i}>{review.title}</p>
                                </Link>
                            ))}
                        </marquee>
                    </div>
                ) : (
                    <p className="review-title">{review.title}</p>
                )}
            </div>

            <div className='artist-genre-wrapper'>
                <p className='review-artist'> {review?.artist} </p>
                <p className='review-genre'> {review?.genre?.type} </p>
            </div>

            <div className='username-rating-wrapper'>
                <Link to={`/profile/member/${review.member.id}`}>
                    <p className='review-username'>{review.member.username}</p>
                </Link>
                <p className='review-rating'> {review?.rating?.rating}
                    <span style={{ marginLeft: '2px' }}>/</span>
                    <span className='rating-text'>5</span>
                </p>
            </div>

            <p className='review-description'> {review?.description.slice(0, 400)}... </p>
            <div>
                {
                    review.member.id === JSON.parse(localStorage.getItem('vinylcut')).member
                        ?
                        <>
                            <div className='button-container'>
                                <button
                                    className="button small"
                                    onClick={() => {
                                        navigate(`/reviews/edit/${review.id}`)
                                    }}>Edit</button>
                                <button className="button small"
                                    onClick={handleDelete}
                                >Delete</button>
                            </div>
                        </>
                        :
                        ""
                }
            </div>

        </div >
    )
}