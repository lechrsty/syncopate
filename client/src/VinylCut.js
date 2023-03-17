import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import { NavBar } from "./components/nav/MemberNav"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { EmployeeRegister } from "./components/auth/EmployeeRegister";
import "./VinylCut.css"

export const VinylCut = () => {


	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/registerMember" element={<Register />} />
		<Route path="/registerEmployee" element={<EmployeeRegister />} />

		<Route path="*" element={
			<Authorized>
				<>
					<div className="container">
						<NavBar />
						<ApplicationViews />
					</div>
				</>
			</Authorized>

		} />
	</Routes>
}