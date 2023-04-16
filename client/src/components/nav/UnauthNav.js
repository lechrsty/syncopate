import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "../../VinylCut.css"
import { Login } from "../auth/Login"

export const UnauthNav = () => {
    const navigate = useNavigate()

    // Handle modal for Create album

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
                            <Link to={`/about`}>
                                <span className="text-container">About</span>
                            </Link>
                        </li>

                        <img className="pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680673420/noun-sparkle-1829144-FCF0ED_svcw2r.svg" alt="star-icon" />

                        <li className="menuItem">
                            <Link to={`/club`}>
                                <span className="text-container">Join club</span>
                            </Link>
                        </li>

                        <img className="pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680673420/noun-sparkle-1829144-FCF0ED_svcw2r.svg" alt="star-icon" />

                        <li className="menuItem">
                            <Link to={`/aotms`}>
                                <span className="text-container">Staff picks</span>
                            </Link>
                        </li>
                    </div>

                    <div className="siteHeader-leftPanelItems-misc-home">

                        <div className="review">
                            <a href="/">
                                <div className="reviewImage rsp-image-module responsive-image fit-cover">
                                    <div>
                                        <img src="https://res.cloudinary.com/dmilofp0z/image/upload/v1681589130/noun-home-5655721-B7412A_gia1jm.svg" alt="home-icon" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

            </div>

            <div className="siteHeader-rightPanel">
                <div className="siteHeader-rightPanelItems">
                    <div className="dashboard">
                        <img className="rotate" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680680852/noun-record-8845-FCF0ED_3_hgoktl.svg" alt="record-icon" />

                        <div className="dashboardItem-li">
                            <a href="#" onClick={handleModal}>
                                <span className="text-container">Login</span>
                            </a>

                            {showModal && (
                                <div className={`modal ${showModal ? 'active' : ''}`}>
                                    <span className="close" onClick={handleModal}>&times;</span>
                                    <div className="modal-content">
                                        <Login handleModal={handleModal} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <img className="rotate" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680680755/noun-record-8845-FCF0ED_1_iyeuwo.svg" alt="record-icon" />
                    </div>

                    <div className="profile">
                        <img className="pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680682070/noun-sparkle-4613407-FCF0ED_euvffh.svg" alt="star-icon" />

                        <li className="profileItem">
                            <Link to={`/aotms`}>
                                <span className="text-container">Register</span>
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
