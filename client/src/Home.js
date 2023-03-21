import { NavBar } from "./components/nav/NavBar"
import "./Home.css"
import "./components/nav/NavBar.css"

export const Home = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <h1>Vinyl Cut</h1>
                <p-hero>Welcome to the club</p-hero>
                <a href="/login">Login | Register</a>
            </div>

            <div className="blank">
                <p-hero>Get records, hand-curated with a whole lot of TLC, delivered to you monthly all while expanding your connections within the music community.</p-hero>
            </div>

            <div className="container second">
                <div className="home-item">
                    <div className="img img-second"></div>
                    <div className="card">
                        <h3>Spin</h3>
                        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet purus vitae elit euismod, in imperdiet metus suscipit. </p>
                    </div>
                </div>
                <div className="home-item">
                    <div className="img img-third"></div>
                    <div className="card">
                        <h3>Share</h3>
                        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet purus vitae elit euismod, in imperdiet metus suscipit. </p>
                    </div>
                </div>
                <div className="home-item">
                    <div className="img img-first"></div>
                    <div className="card">
                        <h3>Repeat</h3>
                        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet purus vitae elit euismod, in imperdiet metus suscipit. </p>
                    </div>
                </div>
            </div>
        </>
    )
}     