import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMemberById } from "../../managers/MemberManager";
import { deleteReview, getReviewsByMember } from "../../managers/ReviewManager";
import { Review } from "../reviews/Review"
import { Link } from 'react-router-dom'
import "../reviews/Review.css"

export const MemberProfile = () => {
    const [reviews, setReviews] = useState([])
    const [member, setMember] = useState({})
    const { memberId } = useParams()

    useEffect(
        () => {
            getReviewsByMember(memberId).then(reviewData => setReviews(reviewData))
        }, [])

    // Get member object for dashboard
    useEffect(
        () => {
            getMemberById(memberId).then((memberData) => {
            setMember(memberData)})
    }, [])

    // Handle delete for review
    const handleDelete = (id) => {
        deleteReview(id).then(() => {
            setReviews((prevState) =>
                prevState.filter((review) => review.id !== id)
            )
        })
    }

    return (
        <article className="review-list-container">
            <div className="review-list-container">
                <div className="profile-dashboard-container">
                    <div className='profile-box'>
                        <a href={`/reviews/${member.image_url}`}>
                            <img style={{ height: '200px', width: '200px', borderRadius: '50%' }}
                                src={member.image_url} />
                        </a>
                        <div className="profile-contents">
                            <p className="profile-name">{member.full_name} </p>
                            <p className="profile-username">{member.username}</p>
                            <p className="profile-joined">{member.joined_on}</p>
                            <p className="profile-bio">{member.bio}</p>

                        </div>
                        <div className='profile-border'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Link to={`/${member?.taste?.id}`}>
                                    <p className='profile-taste'> {member?.taste?.type}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    reviews.map(review => {
                        return <Review onDelete={handleDelete} review={review} key={`review--${review.id}`} />
                    })
                }
            </div>
        </article>
    )
}