import { Outlet, Route, Routes } from "react-router-dom"
import { ReviewList } from "../components/reviews/ReviewList"
import { ReviewDetails } from "../components/reviews/ReviewDetails"
import { EditReview } from "../components/reviews/EditReview"
import { CreateReview } from "../components/reviews/CreateReview"
import { LoggedInProfile } from "../components/profiles/LoggedInProfile"
import { MemberProfile } from "../components/profiles/MemberProfile"

export const MemberViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Vinyl Cut</h1>
                    <div>Welcome to the club!</div>

                    <Outlet />
                </>
            }>

            <Route path="/reviews">
                <Route index element={ <ReviewList /> } />
                <Route path=":reviewId" element={<ReviewDetails />} />
                <Route path="edit/:reviewId" element={<EditReview />} />
                <Route path="create" element={<CreateReview />} />
            </Route>


            <Route path="/profile">
                <Route index element={ <LoggedInProfile /> } />
                <Route path="member/:memberId" element={<MemberProfile />} />

            </Route>


            </Route>
        </Routes>
    )
}