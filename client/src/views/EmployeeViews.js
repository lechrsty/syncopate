import { Outlet, Route, Routes } from "react-router-dom"
import { CreateAlbum } from "../components/albums/CreateAlbum"
import { EmployeeDashboard } from "../components/dashboards/EmployeeDashboard"
import { ClassicsAlbumList } from "../components/albums/ClassicsAlbumList"

export const EmployeeViews = () => {
    
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

            <Route path="/home">
                <Route index element={ <EmployeeDashboard /> } />
            </Route>

            <Route path="/1" element={<ClassicsAlbumList />} />

            <Route path="/upload">
                <Route index element={ <CreateAlbum /> } />
            </Route>

            </Route>
        </Routes>
    )
}