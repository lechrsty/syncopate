import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import "./Review.css"

export const Review = ({ review, onDelete }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        onDelete(review.id)
    }

    return (
        <Card key={`review--${review.id}`} className="review" sx={{ maxWidth: 300 }}>
            <CardContent>
                <Stack spacing={1}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={review?.image_url}
                        title="image"
                    />
                    <Link className="card-link"
                        href={`/reviews/${review.id}`}>
                        <Typography variant="h6">{review.title}</Typography></Link>
                    <Typography> {review?.artist} </Typography>
                    <Typography> {review?.description} </Typography>
                    <Typography paragraph color="text.primary"> {review?.member?.username}</Typography>
                    <Typography paragraph color="text.secondary"> {review?.genre?.type}</Typography>
                    <Typography paragraph color="text.secondary"> {review?.rating?.rating}</Typography>

                    {
                        review.member.id === JSON.parse(localStorage.getItem('vinylcut')).member
                            ?
                            <>
                                <Button className="button" variant="contained" onClick={() => {
                                    navigate(`/reviews/edit/${review.id}`)
                                }}>Edit</Button>
                                <Button className="button" variant="contained"
                                    onClick={handleDelete}
                                >Delete</Button>
                            </>
                            :
                            ""
                    }

                </Stack>
            </CardContent>
        </Card>
    )
}