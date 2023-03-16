import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getSingleReview } from "../../managers/ReviewManager"
import { deleteReview } from "../../managers/ReviewManager"
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import "./Review.css"

export const ReviewDetails = () => {
  const navigate = useNavigate()
  const [review, setReview] = useState({})
  const { reviewId } = useParams()

  useEffect(() => {
    getSingleReview(reviewId).then((data) => setReview(data));
  }, [reviewId])

  return (
    <Card className="review" sx={{ maxWidth: 800, padding: 5}}>
      <CardContent>
        <Stack spacing={2}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={review?.image_url}
                    title="image"
                />
          <Typography className="review__title"> {review?.title}</Typography>
          <Typography className="review__artist"> {review?.artist}</Typography>
          <Typography className="review__description"> {review?.description}</Typography>
          <Typography className="review__category_id"> {review?.genre?.type} </Typography> 
          <Typography className="review__category_id"> {review?.rating?.rating} </Typography> 
          <Typography><Link className="review__members_name" to={`/profile/member/${review?.member?.id}`}> {review?.member?.username} </Link></Typography>
          <Typography className="review__publication_date">{review?.created_on}</Typography>
          <Typography className="review__content"> {review?.content}</Typography>
          <Link className="review__comments" to={`/reviews/${reviewId}/comments`}>Comments</Link>
          
          {
            review.is_member
            ?
            <>
              <Button className="button" variant="contained"  onClick={() => {
                navigate(`/reviews/edit/${review.id}`)
              }}>Edit</Button>
              <Button className="button" variant="contained" onClick={()=>{
                deleteReview(review.id)
                .then(()=>navigate('/reviews'))
              }}>Delete</Button>
            </>
            :
            ""
          }
          
        </Stack>
      </CardContent>
    </Card>
)
}