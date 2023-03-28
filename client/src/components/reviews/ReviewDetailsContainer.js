import { CommentListContainer } from "../comments/CommentContainer"
import { ReviewDetails } from "./ReviewDetails"

export const ReviewDetailsContainer = () => {

    return (
        <>
            <div>

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