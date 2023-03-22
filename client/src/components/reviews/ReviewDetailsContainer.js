import { CommentListContainer } from "../comments/CommentContainer"
import { ReviewDetails } from "./ReviewDetails"
import "./Review.css"

export const ReviewDetailsContainer = () => {

    return (
        <>
            <ReviewDetails/>
            <CommentListContainer/>  
        </>
    )
}