import { CommentListContainer } from "../comments/CommentContainer"
import { ReviewDetails } from "./ReviewDetails"

export const ReviewDetailsContainer = () => {

    return (
        <>
            <div className='detail-container space-between'>
                <div>
                    <ReviewDetails />
                </div>

                <div>
                    <CommentListContainer />
                </div>
            </div>
        </>
    )
}