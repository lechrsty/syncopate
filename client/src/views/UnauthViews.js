import {  Route, Routes } from "react-router-dom"
import { AlbumDetails } from "../components/albums/AlbumDetails"
import { Login } from "../components/auth/Login"
import { MemberRegister } from "../components/auth/MemberRegister"
import { EmployeeRegister } from "../components/auth/EmployeeRegister"
import { Register } from "../components/auth/Register"
import { Home } from "../Home"
import { UnauthAotmList } from "../components/albums/UnauthAotmList"

export const UnauthViews = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerMember" element={<MemberRegister />} />
            <Route path="/registerEmployee" element={<EmployeeRegister />} />
            <Route path="/aotms" element={<UnauthAotmList />} />
            <Route path="/albums/:albumId" element={<AlbumDetails />} />
        </Routes>
    )
}