import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/reviews">Reviews</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile">Profile</Link>
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
