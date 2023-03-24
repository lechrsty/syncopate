import { CommentListContainer } from "../comments/CommentContainer"
import { ReviewDetails } from "./ReviewDetails"
import "./Review.css"
import "./ReviewDetails.css"

export const ReviewDetailsContainer = () => {

    return (
        <>
            <div className='review-detail-container'>
                <div className='review-details-wrapper'>
                    <ReviewDetails />
                </div>
                <div className='comment-list-wrapper'>
                    <CommentListContainer />
                </div>
            </div>
        </>
    )
}