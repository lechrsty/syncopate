import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMemberById } from "../../managers/MemberManager"
import { deleteReview, getReviewsByMember } from "../../managers/ReviewManager"
import { Review } from "../reviews/Review"
import { Link } from 'react-router-dom'

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
                setMember(memberData)
            })
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
        <div>
            
            <div>
                <a href={`/reviews/${member.image_url}`}>
                    <img
                        src={member.image_url} />
                </a>
                <p>{member.full_name} </p>
                <p>{member.username}</p>
                <p>{member.joined_on}</p>
                <p>{member.bio}</p>
                <Link to={`/${member?.taste?.id}`}>
                    <p> {member?.taste?.type}</p>
                </Link>
            </div>

            {
                reviews.map(review => {
                    return <Review onDelete={handleDelete} review={review} key={`review--${review.id}`} />
                })
            }

        </div>
    )
}