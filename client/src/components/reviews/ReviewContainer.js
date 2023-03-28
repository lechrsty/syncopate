import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReviewList } from "../reviews/ReviewList"
import { FilterMembers } from "../reviews/FilterMembers"
import { ReviewSearch } from "../reviews/ReviewSearch"

export const ReviewContainer = () => {
    const navigate = useNavigate()
    const [memberSelection, setMemberSelection] = useState()
    const [searchTerms, setSearchTerms] = useState("")

    return (
        <>
            <div>
                <div>
                    <ReviewSearch setterFunction={setSearchTerms} />
                </div>

                <div>
                    <button
                        onClick={() => {
                            navigate(`/reviews/create`)
                        }}
                    >Drop a review
                    </button>
                </div>

                <div>
                    <FilterMembers setMemberSelection={setMemberSelection} />
                </div>
            </div>

            <div>
                <ReviewList memberSelection={memberSelection} searchTermState={searchTerms} />
            </div>
        </>
    )
}