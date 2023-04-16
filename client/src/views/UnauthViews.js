import { Outlet, Route, Routes } from "react-router-dom"
import { AotmList } from "../components/albums/AotmList"
import { AlbumDetails } from "../components/albums/AlbumDetails"
import { Login } from "../components/auth/Login"
import { MemberRegister } from "../components/auth/MemberRegister"
import { EmployeeRegister } from "../components/auth/EmployeeRegister"
import { Register } from "../components/auth/Register"

export const UnauthViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/registerMember" element={<MemberRegister />} />
                <Route path="/registerEmployee" element={<EmployeeRegister />} />
                <Route path="/aotms" element={<AotmList />} />
                <Route path="/albums/:albumId" element={<AlbumDetails />} />

            </Route>
        </Routes>
    )
}