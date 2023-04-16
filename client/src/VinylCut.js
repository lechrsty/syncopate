import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"
import { NavBar } from "./components/nav/NavBar"
import { UnauthNav } from "./components/nav/UnauthNav"
import { UnauthViews } from "./views/UnauthViews"
import "./VinylCut.css"

export const VinylCut = () => {
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    return (
        <Routes>
            {vinylCutUserObject ? (
                <Route path="*" element={
                    <Authorized>
                        <>
                            <NavBar />
                            <ApplicationViews />
                        </>
                    </Authorized>
                } />
            ) : (
                <Route path="*" element={
                    <>
                        <UnauthNav />
                        <UnauthViews />
                    </>
                } />
            )}
        </Routes>
    )
}