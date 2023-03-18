import * as React from 'react'
import { Link } from "react-router-dom"
import { deleteComment, getCommentsByReviewId } from "../../managers/CommentManager"
import { CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Stack from '@mui/material/Stack'
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
            <Stack spacing={2}>
                <Typography variant="h5" color="text.primary">Comments</Typography>
                {
                    comments.reverse().map(comment => {
                        return <Card className="comment" sx={{ maxWidth: 300 }} key={`comments--${comment.id}`}>
                            <CardContent>

                                <Typography variant="h6" className="comment__username">
                                    <Link className="card-link" to={`/profile/member/${comment.member.id}`}> {comment.member.username}</Link>
                                </Typography>
                                <Typography paragraph color="text.secondary" className="comment__content"> {comment.body} </Typography>

                                {comment.is_member
                                    ? <CardActions>
                                        <DeleteForeverIcon className="delete__DeleteForeverIcon" onClick={
                                            () =>
                                                handleClick(comment.id)}>Delete Comment</DeleteForeverIcon>
                                    </CardActions>
                                    : ""
                                }

                            </CardContent>
                        </Card>
                    })
                }
            </Stack>
        </>
    </article>
}