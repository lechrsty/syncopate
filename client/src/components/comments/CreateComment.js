import { TextareaAutosize } from '@mui/material'
import * as React from 'react'
import { useState } from "react"
import { useEffect } from 'react'
import { addComment, getCommentsByReviewId } from "../../managers/CommentManager"
import { getSingleReview } from '../../managers/ReviewManager'
import "./Comment.css"

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
        <div className="add-comment-container" >
            <div className="detail-imgBx">
                <a href={`/reviews/${reviewimg.id}`}>
                    <img style={{ height: '400px', width: '400px', paddingBottom: '30px', marginTop:'-50px' }}
                        src={reviewimg?.image_url} />
                </a>
            </div>
            <h2>LEAVE A COMMENT </h2>
            <div className='comment-textbox'>
                <TextareaAutosize
                    name="comment" id="comment" required autoFocus
                    aria-label="empty textarea"
                    placeholder="Your most gut-wrechingly honest opinion?"
                    style={{ width: 300 }}
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
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} className='comment-button'>
                <button className="button" type="submit"
                    onClick={handleSubmit}>
                    <span>Submit Comment</span>
                </button >
            </div>
        </div>

    )
}
