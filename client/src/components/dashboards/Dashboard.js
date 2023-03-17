import { EmployeeDashboard } from "./EmployeeDashboard"
import { MemberDashboard } from "./MemberDashboard"

export const Dashboard = () => {

    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    if (vinylCutUserObject.staff) {
        // Return employee nav
        return <EmployeeDashboard />
    }
    else {
        // Return member nav
        return <MemberDashboard />

    }
}