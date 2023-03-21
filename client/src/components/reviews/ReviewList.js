import * as React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { Review } from "./Review";
import { deleteReview, getReviews } from "../../managers/ReviewManager"
import Button from '@mui/material/Button'
import "./Review.css"

export const ReviewList = ({ memberSelection, searchTermState }) => {
    const navigate = useNavigate()

    // Initialize and set state for list of Reviews
    const [reviews, setReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])

    // Get reviews and set state for filtered review list, which will be displayed
    useEffect(
        () => {
            getReviews().then(reviewData => setReviews(reviewData))
            setFilteredReviews(reviews)
        }, [])

    useEffect(
        () => {
            if (memberSelection === 0) {
                setFilteredReviews(reviews)
            }
            else {
                const filteredCopy = reviews.filter(review => review.member.id === parseInt(memberSelection))
                setFilteredReviews(filteredCopy)
            }
        },
        [reviews, memberSelection]
    )

    useEffect(
        () => {
            const searchedReviews = reviews.filter(review => {
                return review?.title?.toLowerCase().includes(searchTermState.toLowerCase())|| review?.artist?.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredReviews(searchedReviews)
        },
        [reviews, searchTermState]
    )

    // Handle delete for review
    const handleDelete = (id) => {
        deleteReview(id).then(() => {
            const updatedReviews = reviews.filter(review => review.id !== id)
            setReviews(updatedReviews)
        })
    }

    return (
        <>
                <Button className="button" variant="contained"
                    onClick={() => {
                        navigate(`/reviews/create`)
                    }}>Drop a Review</Button>
            <article className="review-list-container">

                {
                    filteredReviews.map((review) => {
                        return <Review
                            onDelete={handleDelete}
                            review={review}
                            key={`review--${review.id}`} />
                    })
                }

            </article>
        </>
    )
}