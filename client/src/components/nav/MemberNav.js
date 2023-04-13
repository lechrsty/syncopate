import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { getMemberById } from "../../managers/MemberManager"
import { CreateReview } from "../reviews/CreateReview"
import "../../VinylCut.css"
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

    // Handle modal for Create review

    const [showModal, setShowModal] = useState(false)

    const handleModal = () => setShowModal(!showModal)

    return (
        <main className='siteHeader'>

            <div className="siteHeader-tickerTop">
                <div className="akkurat siteHeader-tickerTopItem">
                    <p className="tickerSpan">
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                        <span> VINYL CUT SEEKS TO EXPERIENCE MUSIC MORE DEEPLY, AND WE BELIEVE IN THE POWER OF THE ALBUM AS AN ART FORM.</span>
                    </p>
                </div>
            </div>

            <div className="siteHeader-leftPanel">
                <div className="siteHeader-leftPanelItems">
                    <div className="siteHeader-leftPanelItems-menu">
                        <li className="menuItem">
                            <Link to={`/${member?.taste?.id}`}>
                                <span className="text-container">Tasties</span>
                            </Link>
                        </li>

                        <img className="pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680673420/noun-sparkle-1829144-FCF0ED_svcw2r.svg" alt="star-icon" />

                        <li className="menuItem">
                            <Link to={`/reviews`}>
                                <span className="text-container">Reviews</span>
                            </Link>
                        </li>

                    </div>

                    <div className="siteHeader-leftPanelItems-misc">
                        <div className="review">
                            <a href="#" onClick={handleModal}>                                <div className="reviewImage rsp-image-module responsive-image fit-cover">
                                <div>
                                    <img src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680676775/noun-idea-1332738-B7412A_fgkbdg.svg" alt="hands-icon" />
                                </div>
                            </div>
                                <p>Drop a review</p>
                            </a>

                            {showModal && (
                                <div className={`modal ${showModal ? 'active' : ''}`}>
                                    <span className="close" onClick={handleModal}>&times;</span>
                                    <div className="modal-content">
                                        <CreateReview handleModal={handleModal} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="logout">
                            <a href="/logout" onClick={() => {
                                localStorage.removeItem("vinylcut")
                                navigate("/login", { replace: true })
                            }}>
                                <img src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680677832/noun-log-out-5594485-B7412A_u96f9w.svg" alt="logout-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="siteHeader-rightPanel">
                <div className="siteHeader-rightPanelItems">
                    <div className="dashboard">
                        <img className="rotate" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680680852/noun-record-8845-FCF0ED_3_hgoktl.svg" alt="record-icon" />

                        <li className="dashboardItem">
                            <Link to={`/dashboard`}>
                                <span className="text-container">Dashboard</span>
                            </Link>
                        </li>

                        <img className="rotate" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680680755/noun-record-8845-FCF0ED_1_iyeuwo.svg" alt="record-icon" />
                    </div>

                    <div className="profile">
                        <img className="pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680682070/noun-sparkle-4613407-FCF0ED_euvffh.svg" alt="star-icon" />

                        <li className="profileItem">
                            <Link to={`/profile`}>
                                <span className="text-container">Profile</span>
                            </Link>
                        </li>

                        <img className="pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680682070/noun-sparkle-4613407-FCF0ED_euvffh.svg" alt="star-icon" />
                    </div>
                </div>
            </div>

            <div className="siteHeader-tickerBottom">
                <div className="akkurat siteHeader-tickerBottomItem">
                    <p className="tickerSpan">
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                        <span> VINYL CUT BEGAN AS A SMALL BASEMENT SHOP LOCATED IN MANHATTAN'S LOWER EAST SIDE. WE QUICKLY BECAME AN INTEGRAL HUB FOR ARTISTS, BOTH ASPIRING AND ESTABLISHES, TO CONVENE AND COLLABORATE.</span>
                    </p>
                </div>
            </div>
        </main>
    )
}