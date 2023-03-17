import { Outlet, Route, Routes } from "react-router-dom"
import { CreateAlbum } from "../components/albums/CreateAlbum"
import { EmployeeDashboard } from "../components/dashboards/EmployeeDashboard"
import { ClassicsAlbumList } from "../components/albums/ClassicsAlbumList"
import { EssentialsAlbumList } from "../components/albums/EssentialsAlbumList"
import { WorldAlbumList } from "../components/albums/WorldAlbumList"
import { HipHopAlbumList } from "../components/albums/HipHopAlbumList"
import { HighVoltageAlbumList } from "../components/albums/HighVoltageAlbumList"
import { NewReleasesAlbumList } from "../components/albums/NewReleasesAlbumList"
import { EditAlbum } from "../components/albums/EditAlbum"

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
            <Route path="/2" element={<EssentialsAlbumList />} />
            <Route path="/3" element={<WorldAlbumList />} />
            <Route path="/4" element={<HipHopAlbumList />} />
            <Route path="/5" element={<HighVoltageAlbumList />} />
            <Route path="/6" element={<NewReleasesAlbumList />} />

            <Route path="/upload">
                <Route index element={ <CreateAlbum /> } />
            </Route>
            <Route path="/edit/:albumId" element={<EditAlbum />} />

            </Route>
        </Routes>
    )
}