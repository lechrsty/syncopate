import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReviewList } from "../reviews/ReviewList"
import { FilterMembers } from "../reviews/FilterMembers"
import { ReviewSearch } from "../reviews/ReviewSearch"
import "./Review.css"

export const ReviewContainer = () => {
    const navigate = useNavigate()
    const [memberSelection, setMemberSelection] = useState()
    const [searchTerms, setSearchTerms] = useState("")

    return (
        <>
            <div className='review-list-container'>
                <div className='review-components'>
                    <div className='review-search-wrapper'>
                        <ReviewSearch setterFunction={setSearchTerms} />
                    </div>
                    <div className='review-button-wrapper'>
                        <button className="button btn-bigger"
                            onClick={() => {
                                navigate(`/reviews/create`)
                            }}
                        ><span>DROP A REVIEW</span>
                        </button>
                    </div>
                    <div className='review-filter-wrapper'>
                        <FilterMembers setMemberSelection={setMemberSelection} />
                    </div>
                </div>
                <div>
                    <ReviewList memberSelection={memberSelection} searchTermState={searchTerms} />
                </div>
            </div>
        </>
    )
}