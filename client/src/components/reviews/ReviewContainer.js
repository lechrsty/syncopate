import { useState } from "react"
import { ReviewList } from "../reviews/ReviewList"
import { FilterMembers } from "../reviews/FilterMembers"
import { ReviewSearch } from "../reviews/ReviewSearch"
import "./Review.css"
import { CommentListContainer } from "../comments/CommentContainer"

export const ReviewContainer = () => {
    
    const [memberSelection, setMemberSelection] = useState()
    const [searchTerms, setSearchTerms] = useState("")

    return (
        <>
            <ReviewSearch setterFunction={setSearchTerms} />
            <FilterMembers setMemberSelection={setMemberSelection} />
            <ReviewList memberSelection={memberSelection}  searchTermState={searchTerms}/>    
        </>
    )
}