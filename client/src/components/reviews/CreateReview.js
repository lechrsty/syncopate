import * as React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getGenres } from '../../managers/GenreManager'
import { getRatings } from '../../managers/RatingManager'
import { createReview } from "../../managers/ReviewManager"
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import "./Review.css"

export const CreateReview = () => {

    const navigate = useNavigate()

    // Initialize and set state for Review
    const [review, setReview] = useState({
        title: "",
        artist: "",
        description: "",
        genre: null,
        rating: null,
        image_url: ""
    })

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
        const copyOfReview = { ...review };
        copyOfReview[event.target.id] = event.target.value;
        setReview(copyOfReview);
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        if (review.title === "") {
            alert("Your untitled album couldn't match D'Angelo.")
        } else if (review.artist === "") {
            alert("It's that obscure that you can't tell us who, huh?")
        } else if (review.description === "") {
            alert("Head empty no thoughts?")
        } else if (review.rating === "") {
            alert("You forgot to rate it!")
        } else if (review.genre === "") {
            alert("Give the genre your best shot.")
        } else {
            createReview(review)
                .then(() => {
                    navigate('/reviews')
                });
        }
    }

    return (
        <article className="create-review-list-container">
            <Card className="reviewForm" sx={{ maxWidth: 800, padding: 5 }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5">Drop a Review</Typography>

                        <fieldset>
                            <div className="form-group">
                                <input type="text" name="title" id="title" required autoFocus className="form-control"
                                    placeholder="Album"
                                    defaultValue={review.title}
                                    onChange={handleInputChange} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <input type="text" name="artist" id="artist" required autoFocus className="form-control"
                                    placeholder="Artist"
                                    defaultValue={review.artist}
                                    onChange={handleInputChange} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <input type="text" name="description" id="description" required autoFocus className="form-control"
                                    placeholder="A gut-wrenchingly honest opinion?"
                                    defaultValue={review.description}
                                    onChange={handleInputChange} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <input type="text" name="image_url" id="image_url" required autoFocus className="form-control"
                                    placeholder="Album image URL"
                                    defaultValue={review.image_url}
                                    onChange={handleInputChange} />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <select name="genre" id="genre" onChange={(handleInputChange)} >
                                    <option value="0" className="form-style">Genre</option>
                                    {genreDropdown.map(genre => (
                                        <option key={`genre--${genre.id}`} value={genre?.id}>
                                            {genre?.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <select name="rating" id="rating" onChange={(handleInputChange)} >
                                    <option value="0" className="form-style">Rate it</option>
                                    {ratingDropdown.map(rating => (
                                        <option key={`rating--${rating.id}`} value={rating?.id}>
                                            {rating?.rating}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                        <Button variant="contained" type="submit"
                            onClick={handleSubmit}
                            className="button">Submit Review
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </article>
    )
}
