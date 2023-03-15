import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/patients">Patients</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/providers">Providers</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/appointments">Appointment</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("vinylcut")
                        }
                    }>
                    Logout
                </Link>
            </li>
        </ul>
    )
}