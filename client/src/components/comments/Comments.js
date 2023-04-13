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

    return <article className="comment-list-container">
        <>
            <div className='space-above'>
                
                {
                    comments.map(comment => {
                        return <div className="comment" key={`comments--${comment.id}`}>
                            <div className='comment-border'>
                                <div className="comment-box">
                                    <a href={`/reviews/${comment.member.image_url}`}>
                                        <img className='comment-image'
                                            src={comment.member.image_url} />
                                    </a>
                                    <div className="comment-content">
                                        <p className="comment-username">
                                            <Link className="link" to={`/profile/member/${comment.member.id}`}> {comment.member.username}</Link>
                                        </p>
                                        <p className="comment-body"> {comment.body} </p>
                                        <div className="comment-username">
                                            <p className='comment-comment'> {comment.created_on.slice(0, 10)} </p>
                                        </div>
                                    </div>
                                    <div style={{ position: 'bottom' }} className='comment-delete'>
                                        {comment.is_member
                                            ?
                                            <DeleteForeverIcon className="delete__DeleteForeverIcon" onClick={
                                                () =>
                                                    handleClick(comment.id)}>Delete Comment</DeleteForeverIcon>
                                            : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    </article>
}