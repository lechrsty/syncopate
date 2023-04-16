import { Outlet, Route, Routes } from "react-router-dom"
import { AotmList } from "../components/albums/AotmList"
import { AlbumDetails } from "../components/albums/AlbumDetails"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EmployeeRegister } from "../components/auth/EmployeeRegister"

export const UnauthViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

                <Route path="/login" element={<Login />} />
                <Route path="/registerMember" element={<Register />} />
                <Route path="/registerEmployee" element={<EmployeeRegister />} />
                <Route path="/aotms" element={<AotmList />} />
                <Route path="/albums/:albumId" element={<AlbumDetails />} />

            </Route>
        </Routes>
    )
}