import * as React from 'react'
import { Link } from "react-router-dom"
import { deleteComment, getCommentsByReviewId } from "../../managers/CommentManager"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import "./Comment.css"


export const Comments = ({ review, setReview, reviewId, comments, setComments }) => {

    const handleClick = (commentId) => {
        deleteComment(commentId).then(() => {
            getCommentsByReviewId(reviewId).then((data) => setComments(data))
        }
        )
    }

    return <article className="comment-list-container">
        <>
            {
                comments.map(comment => {
                    return <div className="comment" key={`comments--${comment.id}`}>
                        <div className='comment-border'>
                            <div className="comment-box">
                                <a href={`/reviews/${comment.member.image_url}`}>
                                    <img style={{ height: '100px', width: '100px', borderRadius: '50px' }}
                                        src={comment.member.image_url} />
                                </a>
                                <div className="comment-content">
                                    <p className="comment-username">
                                        <Link className="link" to={`/profile/member/${comment.member.id}`}> {comment.member.username}</Link>
                                    </p>
                                    <p className="comment-body"> {comment.body} </p>
                                    <div className="comment-date-delete">
                                        <p className='comment-comment'> {comment.created_on.slice(0, 15)} </p>
                                    </div>
                                </div>
                                <div style={{ position:'bottom' }} className='comment-delete'>
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
        </>
    </article>
}