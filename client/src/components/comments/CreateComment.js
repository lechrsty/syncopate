import { TextareaAutosize } from '@mui/material'
import * as React from 'react'
import { useState } from "react"
import { useEffect } from 'react'
import { addComment, getCommentsByReviewId } from "../../managers/CommentManager"
import { getSingleReview } from '../../managers/ReviewManager'

export const CreateComment = ({ reviewId, setReview, setComments }) => {

    const [comment, setComment] = useState({
        body: ""
    })

    const [reviewimg, setReviewImg] = useState({})

    useEffect(() => {
        getSingleReview(reviewId).then((data) => setReviewImg(data))
    }, [reviewId])

    const handleInputChange = (event) => {
        const copyOfComment = { ...comment }
        copyOfComment[event.target.id] = event.target.value
        setComment(copyOfComment)
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        if (comment.body === "") {
            alert("Cannot be empty.")
        } else {

            const copy = { ...comment }
            addComment(reviewId, copy).then(() => {
                getCommentsByReviewId(reviewId).then((data) => setComments(data))
            })
        }
    }


    return (
        <div className='comment-container'>
            <div className='comment-wrapper'>
                <p className='space-above'> </p>
                <a href={`/reviews/${reviewimg.id}`}>
                    <img className='detail-image'
                        src={reviewimg?.image_url} />
                </a>
                <p className='space-above'> </p>
                <p className='comment-header'>Leave a comment </p>
                <TextareaAutosize
                    name="comment" id="comment" required autoFocus
                    aria-label="empty textarea"
                    placeholder=""
                    style={{ minWidth: 300, maxWidth: 400 }}
                    minRows={3}
                    value={comment.body}
                    onChange={
                        (evt) => {
                            const copy = { ...comment }
                            copy.body = evt.target.value
                            setComment(copy)
                        }
                    }
                />
                <div className='space-above'>
                    <button
                        className='button-form'
                        type="submit"
                        onClick={handleSubmit}>
                        Submit comment
                    </button >
                </div>
            </div>
        </div>
    )
}
