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

        <div key={`review--${review.id}`} className="card">
            <div className="imgBx">
                <a href={`/reviews/${review.id}`}>
                    <img
                        src={review?.image_url} />
                </a>
            </div>
            <Link to={`/reviews/${review.id}`} className="link">
                <p className='title'>{review.title}</p>
            </Link>
            <div style={{ display: 'flex', justifyContent: 'space-between', textAlign:'right' }}>
                <p className='artist' style={{textAlign:'left' }}> {review?.artist} </p>
                <p className='genre'> {review?.genre?.type} </p>
            </div>
            <p className='description'> {review?.description.slice(0, 600)}... </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to={`/profile/member/${review.member.id}`}>
                    <p className='username'>{review.member.username}</p>
                </Link>
                <p className='rating'> {review?.rating?.rating}</p>
            </div>
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
        </div >
    )
}