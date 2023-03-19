export const getAlbums = () => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch("http://localhost:8000/albums", {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const getSingleAlbum = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/albums/${id}`, {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const getAlbumsByTasteId = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/albums?taste=${id}`, {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const createAlbum = (album) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    const newAlbum = {
        title: album.title,
        artist: album.artist,
        description: album.description,
        genre: parseInt(album.genre),
        taste: parseInt(album.taste),
        image_url: album.image_url
    }
    return fetch("http://localhost:8000/albums", {
        method: "POST",
        headers: {
            "Authorization" : `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAlbum)
    })
}
export const deleteAlbum = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/albums/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Token ${token}`,
            "Content-Type": "application/json"
    }
    })
}

export const updateAlbum = (id, albumBody) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    
    return fetch(`http://localhost:8000/albums/${id}`, {
    method: "PUT",
    headers: {
        "Authorization" : `Token ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(albumBody),
    });
};

export const getAOTMs = () => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch("http://localhost:8000/aotms", {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}