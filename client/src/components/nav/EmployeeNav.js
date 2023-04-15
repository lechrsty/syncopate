import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTastes } from "../../managers/TasteManager"
import "../../VinylCut.css"


export const EmployeeNav = () => {
    const navigate = useNavigate()

    // Initialize and set state for Taste dropdown
    const [tastes, setTastes] = useState([])

    useEffect(
        () => { getTastes().then(setTastes) }, []
    )

    return (
        <main className='siteHeader'>
            <ul>

                <li>
                    <Link className="link" to="/dashboard">Dashboard</Link>
                </li>

                <li >
                    {tastes.map((taste) => (
                        <li key={taste.id}>
                            <Link className="link" to={`/${taste.id}`}>{taste.type}</Link>
                        </li>
                    ))}
                </li>

                {
                    localStorage.getItem("vinylcut")
                        ? <li className="navbar__item navbar__logout">
                            <Link to="" onClick={() => {
                                localStorage.removeItem("vinylcut")
                                navigate("/login", { replace: true })
                            }}>Logout</Link>
                        </li>
                        : ""
                }

            </ul>
        </main>
    )
}
