import * as React from 'react'
import axios from 'axios'
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

    // Handle input changes
    const handleInputChange = (event) => {
        const copyOfReview = { ...review };
        copyOfReview[event.target.id] = event.target.value;
        setReview(copyOfReview)
    }

    // Hide "upload" button if clicked
    const [uploadClicked, setUploadClicked] = useState(false)

    // Cloudinary image upload
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

    const uploadImage = () => {
        setUploadClicked(true)
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "vinylcut")
        setLoading(true)

        // Make Axios post request
        axios
            .post("https://api.cloudinary.com/v1_1/dmilofp0z/image/upload", formData)
            .then((response) => {
                setImage(response.data.secure_url)
                setLoading(false)
            })
    }

    // POST new review
    const handleSubmit = (event) => {

        event.preventDefault();

        if (review.title === "") {
            alert("You need a title.")
        } else if (review.artist === "") {
            alert("It's that obscure that you can't tell us who, huh?")
        } else if (review.description === "") {
            alert("Head empty no thoughts?")
        } else if (review.rating === "") {
            alert("You forgot to rate it!")
        } else if (review.genre === "") {
            alert("Give the genre your best shot.")
        } else {
            createReview(review, image)
                .then(() => {
                    navigate('/reviews')
                })
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

                        <fieldset >
                            <div className="form-box center-elements">
                                {loading ? (
                                    <h3>Loading...</h3>
                                ) : (
                                    <img src={image} style={{ width: '200px' }} />
                                )}
                                <input name="image_url"
                                    className="form-control"
                                    id="image_url" required autoFocus
                                    type="file"
                                    onChange={(event) => {
                                        setImage(event.target.files[0])
                                        setUploadClicked(false)
                                    }} />
                                {!uploadClicked && (
                                    <button onClick={uploadImage}>Upload Image</button>
                                )}
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
