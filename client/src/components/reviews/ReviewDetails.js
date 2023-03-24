import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getSingleReview } from "../../managers/ReviewManager"
import { deleteReview } from "../../managers/ReviewManager"
import * as React from 'react'
import "./Review.css"
import "./ReviewDetails.css"


export const ReviewDetails = () => {
  const navigate = useNavigate()

  const { reviewId } = useParams()

  const [review, setReview] = useState({})

  useEffect(() => {
    getSingleReview(reviewId).then((data) => setReview(data));
  }, [reviewId])

  return (
    <div className='review-detail-container second'>
    <div key={`review--${review.id}`} className="detail-card">
      <div className='box' style={{ display: 'flex', justifyContent: 'left', marginLeft:'10px' }}>
        <p className='detail-rating'> {review?.rating?.rating}/5</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className='detail-title'> {review?.title} </p>
        <div className='detail-artist-genre-container'>
          <p className='detail-artist'> {review?.artist} </p>
          <p className='detail-genre'> {review?.genre?.type} </p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'left' }}>
        <p style={{ marginRight: '-2px' }}>POSTED BY</p>
        <Link to={`/profile/member/${review?.member?.id}`}>
          <p className='detail-link'>{review?.member?.username}</p>
        </Link>
      </div>
      <p className='detail-description'> {review?.description} </p>
      <div className="detail-button-row">
        {
          review.is_member
            ?
            <>
              <button onClick={() => {
                navigate(`/reviews/edit/${review.id}`)
              }}><span>Edit</span></button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to remove this review?")) {
                    deleteReview(review.id).then(() => navigate("/reviews"));
                  }
                }}
              >
                <span>Delete</span>
              </button>
            </>
            :
            ""
        }
      </div>
    </div>
    </div>
  )
}
