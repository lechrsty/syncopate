import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { EmployeeRegister } from "./components/auth/EmployeeRegister"
import { NavBar } from "./components/nav/NavBar"
import { AotmList } from "./components/albums/AotmList"
import "./VinylCut.css"

export const VinylCut = () => {

	return <Routes>
		<Route path="/" element={<Login />} />
		<Route path="/login" element={<Login />} />
		<Route path="/registerMember" element={<Register />} />
		<Route path="/registerEmployee" element={<EmployeeRegister />} />
		<Route path="/aotms" element={<AotmList />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews/>
				</>
			</Authorized>

		} />
	</Routes>
}
