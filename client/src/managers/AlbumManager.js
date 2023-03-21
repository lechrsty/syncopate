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

// Hard-coded token to display on Home
export const getSingleAlbum = (id) => {

    return fetch(`http://localhost:8000/albums/${id}`, {
        headers: {
            "Authorization" : `Token 0be249c88238743e5b4a7ac370b5145730c28e20`
        }
    })
    .then((res) => res.json())
}

// Hard-coded token to display on Home
export const getAlbumsByTasteId = (id) => {

    return fetch(`http://localhost:8000/albums?taste=${id}`, {
        headers: {
            "Authorization" : `Token 0be249c88238743e5b4a7ac370b5145730c28e20`
        }
    })
    .then((res) => res.json())
}

export const createAlbum = (album, image) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    const newAlbum = {
        title: album.title,
        artist: album.artist,
        description: album.description,
        genre: parseInt(album.genre),
        taste: parseInt(album.taste),
        image_url: image,
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
}

// Hard-coded token to display on Home
export const getAOTMs = () => {

    return fetch("http://localhost:8000/aotms", {
        headers: {
            "Authorization" : `Token 0be249c88238743e5b4a7ac370b5145730c28e20`
        }
    })
    .then((res) => res.json())
}

export const getAOTMByTaste = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/aotms?taste=${id}`, {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const updateAOTM = (id, aotmBody) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    
    return fetch(`http://localhost:8000/aotms/${id}`, {
    method: "PUT",
    headers: {
        "Authorization" : `Token ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(aotmBody),
    })
}