import { EmployeeViews } from "./EmployeeViews"
import { MemberViews } from "./MemberViews"
import { UnauthViews } from "./UnauthViews"

export const ApplicationViews = () => {
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    if (vinylCutUserObject && vinylCutUserObject.staff) {
        // Return employee views
        return <EmployeeViews />
    } else if (vinylCutUserObject) {
        // Return member views
        return <MemberViews />
    } else {
        // Return unauth views)
        return <UnauthViews />
    }
}