import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNavBar = () => {
    return (
        <ul className="navbar">
            
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
