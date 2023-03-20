import * as React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { Review } from "./Review";
import { deleteReview, getReviews } from "../../managers/ReviewManager"
import Button from '@mui/material/Button'
import "./Review.css"

export const ReviewList = (props) => {
    const navigate = useNavigate()

    // Initialize and set state for list of Reviews
    const [reviews, setReviews] = useState([])

    useEffect(
        () => {
            getReviews().then(reviewData => setReviews(reviewData))
        }, [])

    const handleDelete = (id) => {
        deleteReview(id).then(() => {
            const updatedReviews = reviews.filter(review => review.id !== id)
            setReviews(updatedReviews)
        })
    }

    return (
        <>
            <article className="review-list-container">
                <Button className="button" variant="contained"
                    onClick={() => {
                        navigate(`/reviews/create`)
                    }}>Drop a Review</Button>

                {
                    reviews.map((review) => {
                        return <Review
                        onDelete={handleDelete}
                        review={review} 
                        key={`review--${review.id}`} />
                    })
                }

            </article>
        </>
    )
}