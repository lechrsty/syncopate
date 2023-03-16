import * as React from 'react'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleReview, updateReview } from "../../managers/ReviewManager"
import { getGenres } from "../../managers/GenreManager"
import { getRatings } from "../../managers/RatingManager"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import "./Review.css"


export const EditReview = () => {

    const navigate = useNavigate()
    const { reviewId } = useParams()

    // Initialize and set state for Review
    const [review, setReview] = useState({
        title: "",
        artist: "",
        description: "",
        genre: null,
        rating: null,
    })

    useEffect(
        () => { getSingleReview(reviewId).then(setReview) }, []
    )

    // Initialize and set state for Genre dropdown
    const [genreDropdown, setGenreDropdown] = useState([])

    useEffect(
        () => { getGenres().then(setGenreDropdown) }, []
    )

    // Initialize and set state for Rating
    const [ratingDropdown, setRatingDropdown] = useState([])

    useEffect(
        () => { getRatings().then(setRatingDropdown) }, []
    )


    const handleInputChange = (event) => {
        const copyOfReview = { ...review }
        copyOfReview[event.target.name] = event.target.value
        setReview(copyOfReview)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        updateReview(reviewId, review)
            .then(() => navigate('/reviews'))
    }


    return (
        <article className="create-review-list-container">
            <Card className="reviewForm" sx={{ maxWidth: 800, padding: 5 }}>
                <CardContent>
                    <Stack spacing={2}>

                        <Typography variant="h5">Edit Review</Typography>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="title">Album Title: </label>
                                <input type="text" name="title" required autoFocus className="form-control"

                                    defaultValue={review.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="artist">Album Artist: </label>
                                <input type="text" name="artist" required autoFocus className="form-control"

                                    defaultValue={review.artist}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Review: </label>
                                <input type="text" name="description" required autoFocus className="form-control"

                                    defaultValue={review.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="genre">Genre </label>
                                <select
                                    className="form-style"
                                    onChange={(evt) => {
                                        const copy = { ...review };
                                        copy.genre = { id: parseInt(evt.target.value) };
                                        setReview(copy);
                                    }}
                                >
                                    <option value="">{review?.genre?.type}</option>
                                    {genreDropdown.map((genre) => (
                                        <option key={`genre--${genre.id}`} value={genre.id}>
                                            {genre.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="rating">Rating </label>
                                <select
                                    className="form-style"
                                    value={review?.rating?.id}
                                    onChange={(evt) => {
                                        const copy = { ...review };
                                        copy.rating = { id: parseInt(evt.target.value) };
                                        setReview(copy);
                                    }}
                                >
                                    <option value="" disabled={!review?.rating}>
                                        {review?.rating?.rating}
                                    </option>
                                    {ratingDropdown.map((rating) => (
                                        <option key={`rating--${rating?.id}`} value={rating?.id}>
                                            {rating?.rating}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                        <Button variant="contained" type="submit"
                            onClick={handleSubmit}
                            className="button">
                            Submit
                        </Button>

                    </Stack>
                </CardContent>
            </Card>
        </article>
    )
}