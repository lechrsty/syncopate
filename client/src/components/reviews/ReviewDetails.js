import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getSingleReview } from "../../managers/ReviewManager"
import { deleteReview } from "../../managers/ReviewManager"
import * as React from 'react'

export const ReviewDetails = () => {
  const navigate = useNavigate()

  const { reviewId } = useParams()

  const [review, setReview] = useState({})

  useEffect(() => {
    getSingleReview(reviewId).then((data) => setReview(data));
  }, [reviewId])

  return (
    <div className='review-detail-wrapper' key={`review--${review.id}`}>
      <div className="title-genre-wrapper">
        <p className='review-detail-title'> {review?.title} </p>
        <p className='review-detail-rating'> {review?.rating?.rating}
          <span style={{ marginLeft: '2px' }}>/</span>
          <span className='review-detail-rating-text'>5</span>
        </p>
      </div>
      <p className='review-detail-artist'> {review?.artist} </p>
      <p className='review-detail-genre'> {review?.genre?.type} </p>

      <div className="username-genre-wrapper">
        <p className='review-detail-genre' style={{ marginRight: '5px' }}>Posted by</p>
        <Link to={`/profile/member/${review?.member?.id}`}>
          <p className='review-username'> {review?.member?.username}</p>
        </Link>
      </div>

      <p className='review-detail-description'> {review?.description} </p>

      <div>
        {
          review.is_member
            ?
            <>
            <div className="button-container">
              <button 
                className="button"
                onClick={() => {
                navigate(`/reviews/edit/${review.id}`)
              }}>Edit</button>
              <button 
                className="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to remove this review?")) {
                    deleteReview(review.id).then(() => navigate("/reviews"))
                  }
                }}
              >
                Delete
              </button>
              </div>
            </>
            :
            ""
        }
      </div>

    </div>
  )
}
