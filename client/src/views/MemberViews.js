import { Outlet, Route, Routes } from "react-router-dom"
import { ReviewList } from "../components/reviews/ReviewList"

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

            <Route path="reviews" element={ <ReviewList /> } />


            </Route>
        </Routes>
    )
}