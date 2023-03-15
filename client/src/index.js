import { VinylCut } from "./VinylCut"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <VinylCut />
    </BrowserRouter>
)

