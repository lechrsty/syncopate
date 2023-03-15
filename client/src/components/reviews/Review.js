import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import "./Review.css"
import Link from '@mui/material/Link'

export const Review = ({ review }) => (
    <Card key={`review--${review.id}`} className="review" sx={{ maxWidth: 300 }}>
        <CardContent>
            <Stack spacing={2}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={review?.image_url}
                    title="image"
                />
                <Link className="card-link"
                    href={`/reviews/${review.id}`}>
                    <Typography variant="h6">{review.title}</Typography></Link>
                <Typography> {review?.artist} </Typography>
                <Typography> {review?.description} </Typography>
                <Typography> {review?.content} </Typography>
                <Typography paragraph color="text.primary"> {review?.member?.username}</Typography>
                <Typography paragraph color="text.secondary"> {review?.genre?.type}</Typography>
                <Typography paragraph color="text.secondary"> {review?.rating}/5</Typography>

            </Stack>
        </CardContent>
    </Card>
)

