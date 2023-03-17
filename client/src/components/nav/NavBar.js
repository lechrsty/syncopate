import { EmployeeNav } from "./EmployeeNav"
import { MemberNav } from "./MemberNav"

export const NavBar = () => {

    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    if (vinylCutUserObject.staff) {
        // Return employee nav
        return <EmployeeNav />
    }
    else {
        // Return member nav
        return <MemberNav />

    }
}