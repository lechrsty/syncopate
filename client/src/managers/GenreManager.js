export const getGenres = () => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch("http://localhost:8000/genres", {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}
