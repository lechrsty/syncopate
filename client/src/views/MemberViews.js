import { Outlet, Route, Routes } from "react-router-dom"
import { ReviewList } from "../components/reviews/ReviewList"
import { ReviewDetails } from "../components/reviews/ReviewDetails"
import { EditReview } from "../components/reviews/EditReview"
import { CreateReview } from "../components/reviews/CreateReview"
import { LoggedInProfile } from "../components/profiles/LoggedInProfile"
import { MemberProfile } from "../components/profiles/MemberProfile"
import { CommentListContainer } from "../components/comments/CommentContainer"
import { MemberDashboard } from "../components/dashboards/MemberDashboard"


export const MemberViews = () => {
    
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

            <Route path="/home">
                <Route index element={ <MemberDashboard /> } />
            </Route>

            <Route path="/reviews">
                <Route index element={ <ReviewList /> } />
                <Route path=":reviewId" element={<ReviewDetails />} />
                <Route path="edit/:reviewId" element={<EditReview />} />
                <Route path="create" element={<CreateReview />} />
                <Route path=":reviewId/comments" element={< CommentListContainer />} />

            </Route>


            <Route path="/profile">
                <Route index element={ <LoggedInProfile /> } />
                <Route path="member/:memberId" element={<MemberProfile />} />
            </Route>


            </Route>
        </Routes>
    )
}