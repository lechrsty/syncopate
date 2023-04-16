import { useEffect, useState } from "react"
import { getMemberById } from "../../managers/MemberManager"
import { deleteReview, getReviewsByLoggedInMember } from "../../managers/ReviewManager"
import { Review } from "../reviews/Review"
import { Link } from 'react-router-dom'
import "./Profile.css"

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

            <div className="profile-wrapper">
                <div className="profile-image-container">
                    <img className="profile-image"
                        src={member.image_url} />
                </div>

                <div className="profile-bio-container">
                    <p className="bio-name "> 
                    {/* <img className='icon-small' src="https://res.cloudinary.com/dmilofp0z/image/upload/v1681417235/noun-music-1111686-FFFFFF_fxz5dr.svg" />  */}
                    {member.username} </p>
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
                    reviews.reverse().map(review => {
                        return <Review review={review} onDelete={handleDelete} key={`review--${review.id}`} />
                    })
                }
            </div>

        </div>
    )
}