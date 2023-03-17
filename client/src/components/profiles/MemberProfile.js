import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByMember } from "../../managers/ReviewManager";
import { Review } from "../reviews/Review"
import "./Profile.css"

export const MemberProfile = () => {
    const [reviews, setReviews] = useState([])
    const { memberId } = useParams()

    useEffect(
        () => {
            getReviewsByMember(memberId).then(reviewData => setReviews(reviewData))
        }, [])

    return (
        <article className="profile-list-container">
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