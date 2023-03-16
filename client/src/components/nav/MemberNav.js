import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)
    if (vinylCutUserObject) {

        return (
            <nav>
                <div className="navicon">
                    <div></div>
                </div>
                <ul className="navbar">


                    <li className="navbar__item">
                        <Link className="navbar__link" to="/home">Home</Link>
                    </li>

                    <li className="navbar__item">
                        <Link className="navbar__link" to="/reviews">Reviews</Link>
                    </li>

                    <li className="navbar__item">
                        <Link className="navbar__link" to="/profile">Profile</Link>
                    </li>

                    {
                        localStorage.getItem("vinylcut")
                            ? <li className="navbar__item navbar__logout">
                                <Link variant="text" className="navbar__link" to="" onClick={() => {
                                    localStorage.removeItem("vinylcut")
                                    navigate("/", { replace: true })
                                }}>Logout</Link>
                            </li>
                            : ""
                    }
                </ul>

            </nav>
        )
    }
}