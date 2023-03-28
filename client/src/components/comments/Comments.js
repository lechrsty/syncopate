import * as React from 'react'
import { Link } from "react-router-dom"
import { deleteComment, getCommentsByReviewId } from "../../managers/CommentManager"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const Comments = ({ review, setReview, reviewId, comments, setComments }) => {

    const handleClick = (commentId) => {
        deleteComment(commentId).then(() => {
            getCommentsByReviewId(reviewId).then((data) => setComments(data))
        }
        )
    }

    return <article>
        <>
            {
                comments.map(comment => {
                    return <div key={`comments--${comment.id}`}>
                        <a href={`/reviews/${comment.member.image_url}`}>
                            <img
                                src={comment.member.image_url} />
                        </a>
                        <p>
                            <Link className="link" to={`/profile/member/${comment.member.id}`}> {comment.member.username}</Link>
                        </p>
                        <p> {comment.body} </p>
                        <p> {comment.created_on.slice(0, 15)} </p>
                        <div>
                            {comment.is_member
                                ?
                                <DeleteForeverIcon className="delete__DeleteForeverIcon" onClick={
                                    () =>
                                        handleClick(comment.id)}>Delete Comment</DeleteForeverIcon>
                                : ""
                            }
                        </div>
                    </div>
                })
            }
        </>
    </article>
}