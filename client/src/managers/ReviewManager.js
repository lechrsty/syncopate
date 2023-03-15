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

export const getReviewByMember = (id) => {
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

export const addReview = (review) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    const newReview = {
        title: review.title,
        category: parseInt(review.category_id),
        image_url: review.image_url,
        content: review.content,
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
    });
};

