export const getReviews = () => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch("http://localhost:8000/reviews", {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const getSingleReview = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/reviews/${id}`, {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const getReviewsByMember = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/reviews?member=${id}`, {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const getReviewsByLoggedInMember = () => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/reviews/mine`, {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
    .then((res) => res.json())
}

export const createReview = (review) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    const newReview = {
        title: review.title,
        artist: review.artist,
        description: review.description,
        genre: parseInt(review.genre),
        rating: parseInt(review.rating),
        image_url: review.image_url,
        approved : 1
    }
    return fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers: {
            "Authorization" : `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    })
}
export const deleteReview = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/reviews/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Token ${token}`,
            "Content-Type": "application/json"
    }
    })
}

export const updateReview = (id, reviewBody) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    
    return fetch(`http://localhost:8000/reviews/${id}`, {
    method: "PUT",
    headers: {
        "Authorization" : `Token ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewBody),
    })
}

