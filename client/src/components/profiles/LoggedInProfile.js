import { useEffect, useState } from "react";
import { getReviewsByLoggedInMember } from "../../managers/ReviewManager";
import { Review } from "../reviews/Review"
import "./Profile.css"

export const LoggedInProfile = ( ) => {
    const [reviews, setReviews] = useState([])

    useEffect(
        () => {
            getReviewsByLoggedInMember().then(setReviews)
        }, [])

        return (
            <article className="review-list-container">
            <div style={{ margin: "0rem 3rem" }}>
            <section>
                {
                    reviews.map(review => {
                        return <Review review={review} key={`review--${review.id}`} />
                    })
                }
            </section>
            </div>
            </article>  
        );
}