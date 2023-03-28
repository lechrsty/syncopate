import { useEffect, useState } from "react"
import { getMemberById } from "../../managers/MemberManager"
import { deleteReview, getReviewsByLoggedInMember } from "../../managers/ReviewManager"
import { Review } from "../reviews/Review"
import { Link } from 'react-router-dom'

export const LoggedInProfile = () => {
    const [reviews, setReviews] = useState([])
    const [member, setMember] = useState({})

    // Get member object for dashboard
    useEffect(() => {
        const localVinylCutUser = localStorage.getItem("vinylcut")
        const vinylCutUserObject = JSON.parse(localVinylCutUser)
        if (vinylCutUserObject) {
            getMemberById(vinylCutUserObject.member).then((memberData) => {
                setMember(memberData)
            })
        }
    }, [])

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

            <div>
                {
                    reviews.reverse().map(review => {
                        return <Review review={review} onDelete={handleDelete} key={`review--${review.id}`} />
                    })
                }
            </div>

        </div>
    )
}