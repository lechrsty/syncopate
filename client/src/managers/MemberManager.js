export const getMemberById = (memberId) => {
    const auth = localStorage.getItem("vinylcut");
    const token = JSON.parse(auth).token;

    return fetch(`http://localhost:8000/members/${memberId}`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    }).then((res) => res.json());
}