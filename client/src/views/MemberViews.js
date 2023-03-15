import { Outlet, Route, Routes } from "react-router-dom"
import { ReviewList } from "../components/reviews/ReviewList"
import { ReviewDetails } from "../components/reviews/ReviewDetails"

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
            </Route>



            </Route>
        </Routes>
    )
}