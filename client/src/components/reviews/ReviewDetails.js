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
    <div key={`review--${review.id}`}>

      <p> {review?.rating?.rating}/5</p>
      <p> {review?.title} </p>
      <p> {review?.artist} </p>
      <p> {review?.genre?.type} </p>

      <div>
        <p>Posted by</p>
        <Link to={`/profile/member/${review?.member?.id}`}>
          <p className='detail-link'>{review?.member?.username}</p>
        </Link>
      </div>

      <p> {review?.description} </p>

      <div>
        {
          review.is_member
            ?
            <>
              <button onClick={() => {
                navigate(`/reviews/edit/${review.id}`)
              }}>Edit</button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to remove this review?")) {
                    deleteReview(review.id).then(() => navigate("/reviews"));
                  }
                }}
              >
                Delete
              </button>
            </>
            :
            ""
        }
      </div>

    </div>
  )
}
