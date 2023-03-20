import { useState } from "react"
import { ReviewList } from "../reviews/ReviewList"
import { FilterMembers } from "../reviews/FilterMembers"
import { ReviewSearch } from "../reviews/ReviewSearch"
import "./Review.css"

export const ReviewContainer = () => {
    
    const [memberSelection, setMemberSelection] = useState()
    console.log(memberSelection)
    const [searchTerms, setSearchTerms] = useState("")
    console.log(searchTerms)

    return (
        <>
            <FilterMembers setMemberSelection={setMemberSelection} />
            <ReviewSearch setterFunction={setSearchTerms} />
            <ReviewList memberSelection={memberSelection}  searchTermState={searchTerms}/>    
        </>
    )
}

