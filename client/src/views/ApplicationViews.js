import { EmployeeViews } from "./EmployeeViews"
import { MemberViews } from "./MemberViews"

export const ApplicationViews = () => {

    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    if (vinylCutUserObject.staff) {
        // Return employee views
        return <EmployeeViews />
    }
    else {
        // Return member views
        return <MemberViews />

    }
}