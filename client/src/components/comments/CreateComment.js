import * as React from 'react'
import { useState } from "react"
import { addComment, getCommentsByReviewId } from "../../managers/CommentManager"
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import "./Comment.css"

export const CreateComment = ({ reviewId, setReview , setComments }) => {
    
    const [comment, setComment] = useState({
        body: ""
    })

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
                getCommentsByReviewId(reviewId).then((data) => setComments(data))})
        }
    }
    

return (
    <Card sx={{ maxWidth: 300, padding: 5}}>
        <Stack spacing={2}>
        <Typography variant="h6" color="text.primary">Add a Comment: </Typography>
            <TextField variant="outlined" type="text" name="comment" id="comment" required autoFocus className="form-control"
                placeholder="What are your thoughts?"
                value={comment.body}
                onChange={
                    (evt) => {
                        const copy = {...comment}
                        copy.body = evt.target.value
                        setComment(copy)
                    }
                }
            />
        <Button variant="contained" type="submit"
            onClick={handleSubmit}
            className="btn btn-primary">
                Submit Comment
        </Button >
        </Stack>
    </Card>
    )
}
