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
            <ReviewSearch setterFunction={setSearchTerms} />
            <FilterMembers setMemberSelection={setMemberSelection} />
            <ReviewList memberSelection={memberSelection}  searchTermState={searchTerms}/>    
        </>
    )
}

