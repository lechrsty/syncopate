import { EmployeeNav } from "./EmployeeNav"
import { MemberNav } from "./MemberNav"
import { GuestNav } from "./GuestNav"

export const NavBar = () => {

    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    if (vinylCutUserObject && vinylCutUserObject.staff) {
        // Return employee nav
        return <EmployeeNav />
    }
    else if (vinylCutUserObject) {
        // Return member nav
        return <MemberNav />
    }
    else {
        // Return guest nav
        return <GuestNav />
    }
}