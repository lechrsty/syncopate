import { useEffect, useState } from "react";
import { getMemberById } from "../../managers/MemberManager";
import { deleteReview, getReviewsByLoggedInMember } from "../../managers/ReviewManager";
import { Review } from "../reviews/Review"
import { Link } from 'react-router-dom'
import "../reviews/Review.css"
import './Profile.css'

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

    console.log(member)

    return (
        <article className="review-list-container">
            <div className="profile-dashboard-container">
                <div className='profile-box' style={{ marginLeft: '100px', marginRight: '100px'}}>
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
            <div className="review-list-container">
                {
                    reviews.reverse().map(review => {
                        return <Review review={review} onDelete={handleDelete} key={`review--${review.id}`} />
                    })
                }
            </div>
        </article>
    )
}