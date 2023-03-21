import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const GuestNav = () => {

    return (
        <>
            <ul className="navbar">


                <li className="navbar__item">
                    <Link className="navbar__link" to="/aotms">Records of the Month</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/join">Join the Club</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/login">Account</Link>
                </li>

            </ul>

        </>
    )
}

