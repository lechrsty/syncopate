export const getEmployeeById = (employeeId) => {
    const auth = localStorage.getItem("vinylcut");
    const token = JSON.parse(auth).token;

    return fetch(`http://localhost:8000/employees/${employeeId}`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    }).then((res) => res.json());
}