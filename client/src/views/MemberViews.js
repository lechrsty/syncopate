import { Outlet, Route, Routes } from "react-router-dom"

export const MemberViews = ({ token, setToken }) => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Vinyl Cut</h1>
                    <div>Welcome to the club!</div>

                    <Outlet />
                </>
            }>

            </Route>
        </Routes>
    )
}