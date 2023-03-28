import { Outlet, Route, Routes } from "react-router-dom"
import { CreateAlbum } from "../components/albums/CreateAlbum"
import { ClassicsAlbumList } from "../components/albums/ClassicsAlbumList"
import { EssentialsAlbumList } from "../components/albums/EssentialsAlbumList"
import { WorldAlbumList } from "../components/albums/WorldAlbumList"
import { HipHopAlbumList } from "../components/albums/HipHopAlbumList"
import { HighVoltageAlbumList } from "../components/albums/HighVoltageAlbumList"
import { NewReleasesAlbumList } from "../components/albums/NewReleasesAlbumList"
import { EditAlbum } from "../components/albums/EditAlbum"
import { AotmList } from "../components/albums/AotmList"
import { AlbumDetails } from "../components/albums/AlbumDetails"
import { EmployeeDashboard } from "../components/dashboard/employee/EmployeeDashboard"

export const EmployeeViews = () => {
    
    return (
            <Routes>
                <Route path="/" element={
                    <>
                        <Outlet />
                    </>
                }>

                    <Route path="/dashboard" element={<EmployeeDashboard />} />

                    <Route path="/aotms" element={<AotmList />} />

                    <Route path="/1" element={<ClassicsAlbumList />} />
                    <Route path="/2" element={<EssentialsAlbumList />} />
                    <Route path="/3" element={<WorldAlbumList />} />
                    <Route path="/4" element={<HipHopAlbumList />} />
                    <Route path="/5" element={<HighVoltageAlbumList />} />
                    <Route path="/6" element={<NewReleasesAlbumList />} />

                    <Route path="/albums/:albumId" element={<AlbumDetails />} />

                    <Route path="/upload">
                        <Route index element={<CreateAlbum />} />
                    </Route>
                    <Route path="/edit/:albumId" element={<EditAlbum />} />

                </Route>
            </Routes>
    )
}