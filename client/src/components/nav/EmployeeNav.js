import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTastes } from "../../managers/TasteManager"
import "../../VinylCut.css"
import { CreateAlbum } from "../albums/CreateAlbum"


export const EmployeeNav = () => {
    const navigate = useNavigate()

    // Initialize and set state for Taste dropdown
    const [tastes, setTastes] = useState([])

    useEffect(
        () => { getTastes().then(setTastes) }, []
    )

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
                            <Link to="/1">
                                <span className="text-container-employee">classics</span>
                            </Link>
                        </li>

                        <img className="employee pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680673420/noun-sparkle-1829144-FCF0ED_svcw2r.svg" alt="star-icon" />

                        <li className="menuItem smaller">
                            <Link to="/2">
                                <span className="text-container-employee">essentials</span>
                            </Link>
                        </li>

                        <img className="employee pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680673420/noun-sparkle-1829144-FCF0ED_svcw2r.svg" alt="star-icon" />

                        <li className="menuItem">
                            <Link to="/3">
                                <span className="text-container-employee">WORLD</span>
                            </Link>
                        </li>
                        <img className="employee pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680673420/noun-sparkle-1829144-FCF0ED_svcw2r.svg" alt="star-icon" />

                        <li className="menuItem">
                            <Link to="/4">
                                <span className="text-container-employee">HH </span>
                            </Link>
                        </li>

                        <img className="employee pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680673420/noun-sparkle-1829144-FCF0ED_svcw2r.svg" alt="star-icon" />

                        <li className="menuItem">
                            <Link to="/5">
                                <span className="text-container-employee">HV</span>
                            </Link>
                        </li>

                        <img className="employee pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680673420/noun-sparkle-1829144-FCF0ED_svcw2r.svg" alt="star-icon" />

                        <li className="menuItem">
                            <Link to="/6">
                                <span className="text-container-employee">NR</span>
                            </Link>
                        </li>
                    </div>
                    <div className="siteHeader-leftPanelItems-misc">


                        {showModal && (
                            <div className={`modal ${showModal ? 'active' : ''}`}>
                                <span className="close" onClick={handleModal}>&times;</span>
                                <div className="modal-content">
                                    <CreateAlbum handleModal={handleModal} />
                                </div>
                            </div>
                        )}

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
                        <img className="employee pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680682070/noun-sparkle-4613407-FCF0ED_euvffh.svg" alt="star-icon" />

                        <li className="profileItem">
                        <a href="#" onClick={handleModal}>      
                                <span className="text-container">Upload Album</span>
                            </a>
                        </li>

                        <img className="employee pulse" src="https://res.cloudinary.com/dmilofp0z/image/upload/v1680682070/noun-sparkle-4613407-FCF0ED_euvffh.svg" alt="star-icon" />
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
