export const isStaff = () => {
    const auth = localStorage.getItem("vinylcut")
    const userType = JSON.parse(auth)
    return userType?.staff
}