import { AlbumDetails } from "../components/albums/AlbumDetails"
import { AotmList } from "../components/albums/AotmList"
import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../Home"
import { Login } from "@mui/icons-material"
import { Register } from "../components/auth/Register"
import { EmployeeRegister } from "../components/auth/EmployeeRegister"


export const GuestViews = () => {

    return (
        <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registerMember" element={<Register
                />} />
                <Route path="/registerEmployee" element={<EmployeeRegister />} />
                <Route path="/aotms" element={<AotmList />} />
                <Route path="/albums/:albumId" element={<AlbumDetails />} />

        </Routes>
    )
}