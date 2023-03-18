import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { getMemberById } from "../../managers/MemberManager"
import "./NavBar.css"

export const MemberNav = () => {
    const navigate = useNavigate()

    // Initialize and set state to get logged in Member and dynamially render the correct Tasties link that is assigned in the Member object
    const [member, setMember] = useState(null)

    useEffect(() => {
        const localVinylCutUser = localStorage.getItem("vinylcut")
        const vinylCutUserObject = JSON.parse(localVinylCutUser)
        if (vinylCutUserObject) {
            getMemberById(vinylCutUserObject.member).then((memberData) => {
                setMember(memberData)
            })
        }
    }, [])

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
                <Link className="navbar__link" to={`/${member?.taste?.id}`}>Tasties</Link>
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
