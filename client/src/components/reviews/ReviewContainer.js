import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReviewList } from "../reviews/ReviewList"
import { FilterMembers } from "../reviews/FilterMembers"
import { ReviewSearch } from "../reviews/ReviewSearch"
import Button from '@mui/material/Button'
import "./Review.css"

export const ReviewContainer = () => {
    const navigate = useNavigate()
    const [memberSelection, setMemberSelection] = useState()
    const [searchTerms, setSearchTerms] = useState("")

    return (
        <>
            <Button className="button" variant="contained"
                onClick={() => {
                    navigate(`/reviews/create`)
                }}
            >Drop a Review
            </Button>
            <ReviewSearch setterFunction={setSearchTerms} />
            <FilterMembers setMemberSelection={setMemberSelection} />
            <ReviewList memberSelection={memberSelection} searchTermState={searchTerms} />
        </>
    )
}