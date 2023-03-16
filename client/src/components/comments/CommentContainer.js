import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getCommentsByReviewId } from "../../managers/CommentManager";
import { getSingleReview } from "../../managers/ReviewManager";
import { Comments } from "./Comments";
import { CreateComment } from "./CreateComment";

export const CommentListContainer = () => {
    
    const [review, setReview] = useState({review_comment:[]})
    const [comments, setComments] = useState([])

    const { reviewId } = useParams()
    
    useEffect(()=>{
        getSingleReview(reviewId).then((data) => setReview(data));
        getCommentsByReviewId(reviewId).then(setComments)
    },[reviewId])

    return <article className="comment-list-container">
        <>
            <CreateComment reviewId={reviewId} setReview = {setReview} setComments={setComments} />
            <Comments review = {review} setReview = {setReview} reviewId = {reviewId} comments = {comments} setComments = {setComments}/>
        </>
    </article>
}