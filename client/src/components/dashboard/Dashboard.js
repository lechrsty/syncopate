
import { EmployeeDashboardContainer } from "./employee/EmployeeDashboardContainer"
import { MemberDashboardContainer } from "./member/MemberDashboardContainer"

export const Dashboard = () => {

    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    if (vinylCutUserObject.staff) {
        // Return Employee Dashboard
        return <EmployeeDashboardContainer />
    }
    else {
        // Return Member Dashboard
        return <MemberDashboardContainer />

    }
}