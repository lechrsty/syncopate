import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect} from "react"
import { getTastes } from "../../managers/TasteManager"
import "./NavBar.css"

export const EmployeeNav = () => {

    // Initialize and set state for Taste dropdown
    const [tastes, setTastes] = useState([])

    useEffect(
        () => { getTastes().then(setTastes) }, []
    )

    return (
        <nav>
            <div className="navicon">
                <div></div>
            </div>
            <ul className="navbar">
                {tastes.map((taste) => (
                    <li className="navbar__item" key={taste.id}>
                        <Link className="navbar__link" to={`/${taste.id}`}>{taste.type}</Link>
                    </li>
                ))}
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
        </nav>
    )
}
