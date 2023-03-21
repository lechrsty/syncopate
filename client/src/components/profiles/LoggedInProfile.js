import { useEffect, useState } from "react";
import { deleteReview, getReviewsByLoggedInMember } from "../../managers/ReviewManager";
import { Review } from "../reviews/Review"
import "../reviews/Review.css"

export const LoggedInProfile = () => {
    const [reviews, setReviews] = useState([])

    useEffect(
        () => {
            getReviewsByLoggedInMember().then(setReviews)
        }, [])

    // Handle delete for review
    const handleDelete = (id) => {
        deleteReview(id).then(() => {
            const updatedReviews = reviews.filter(review => review.id !== id)
            setReviews(updatedReviews)
        })
    }


    return (
        <article className="list-container">

            {
                reviews.reverse().map(review => {
                    return <Review review={review} onDelete={handleDelete} key={`review--${review.id}`} />
                })
            }
        </article>
    )
}