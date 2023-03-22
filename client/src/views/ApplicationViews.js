import { EmployeeViews } from "./EmployeeViews"
import { GuestViews } from "./GuestViews"
import { MemberViews } from "./MemberViews"

export const ApplicationViews = () => {

    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    if (vinylCutUserObject.staff) {
        // Return employee views
        return <EmployeeViews />
    }
    else if (vinylCutUserObject) {
        // Return member nav
        return <MemberViews />
    }
    else {
        // Return guest nav
        return <GuestViews />
    }
}