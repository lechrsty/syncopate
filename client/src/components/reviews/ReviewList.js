import { useEffect, useState } from "react"
import { Review } from "./Review";
import { getReviews } from "../../managers/ReviewManager"
import * as React from 'react'
import "./Review.css"

export const ReviewList = ( props ) => {

    const [reviews, setReviews] = useState([])

    useEffect(
        () => {
            getReviews().then(reviewData => setReviews(reviewData))
        }, [])


    return (
    <>
        <article className="review-list-container">
            {
                reviews.map((review) => {
                    return <Review review={review} key={`review--${review.id}`}/>
                })
            }
            </article>
    </>
    )
}
