export const getTastes = () => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch("http://localhost:8000/tastes", {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const registerTastes = () => {
    return fetch("http://localhost:8000/tastes", {
        headers: {
            "Authorization" : `Token 0be249c88238743e5b4a7ac370b5145730c28e20`
        }
    })
    .then((res) => res.json())
}

export const updateTaste = (id, newTaste) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    
    return fetch(`http://localhost:8000/members/${id}`, {
        method: "PUT",
        headers: {
            "Authorization" : `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ taste: newTaste }),
    })
}
