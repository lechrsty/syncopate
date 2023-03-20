export const getMembers = () => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch("http://localhost:8000/members", {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const getMemberById = (memberId) => {
    const auth = localStorage.getItem("vinylcut");
    const token = JSON.parse(auth).token;

    return fetch(`http://localhost:8000/members/${memberId}`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    }).then((res) => res.json());
}

export const updateMember = (id, body) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    
    return fetch(`http://localhost:8000/members/${id}/selections`, {
    method: "PUT",
    headers: {
        "Authorization" : `Token ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    });
}