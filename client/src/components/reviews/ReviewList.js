import * as React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import Button from '@mui/material/Button'
import { Review } from "./Review";
import { getReviews } from "../../managers/ReviewManager"
import "./Review.css"

export const ReviewList = (props) => {
    const navigate = useNavigate()

    // Initialize and set state for list of Reviews
    const [reviews, setReviews] = useState([])

    useEffect(
        () => {
            getReviews().then(reviewData => setReviews(reviewData))
        }, [])


    return (
        <>
            <article className="review-list-container">
                <Button className="button" variant="contained" onClick={() => {
                    navigate(`/reviews/create`)
                }}>Drop a Review</Button>

                {
                    reviews.map((review) => {
                        return <Review review={review} key={`review--${review.id}`} />
                    })
                }
            </article>
        </>
    )
}
