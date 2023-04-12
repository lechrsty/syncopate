import { useState } from "react"
import { ReviewList } from "../reviews/ReviewList"
import { FilterMembers } from "../reviews/FilterMembers"
import { ReviewSearch } from "../reviews/ReviewSearch"
import "../../VinylCut.css"
import "./Review.css"

export const ReviewContainer = () => {
    const [memberSelection, setMemberSelection] = useState()
    const [searchTerms, setSearchTerms] = useState("")

    return (
        <>
            <main className='tasty-content-wrapper'>
                <h2 className='tasty-header'> Reviews</h2>
            </main>

            <div className="review-wrapper">
                <div className="review-filter">
                    <FilterMembers setMemberSelection={setMemberSelection} />
                </div>
                <div className="review-search">
                <ReviewSearch setterFunction={setSearchTerms} />
                </div>
            </div>

            <ReviewList memberSelection={memberSelection} searchTermState={searchTerms} />
        </>
    )
}