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
            <main className='tasty-content-wrapper'>
                <h2 className='tasty-header'> {member.username} </h2>
            </main>

            <div className="profile-wrapper">
                <div className="profile-image-container">
                    <img className="profile-image"
                        src={member.image_url} />
                </div>

                <div className="profile-bio-container">
                    <p className="bio-name "> 
                    {/* <img className='icon-small' src="https://res.cloudinary.com/dmilofp0z/image/upload/v1681417235/noun-music-1111686-FFFFFF_fxz5dr.svg" />  */}
                    {member.full_name} </p>
                    <p className="bio-description">{member.bio}</p>
                </div>

                <div className="profile-taste-container">
                    <Link to={`/${member?.taste?.id}`}>
                        <p className="profile-taste"> {member?.taste?.type}</p>
                    </Link>
                </div>
            </div>

            <div className="review-list-container">
                {
                    reviews.map(review => {
                        return <Review onDelete={handleDelete} review={review} key={`review--${review.id}`} />
                    })
                }
            </div>
        </div>
    )
}