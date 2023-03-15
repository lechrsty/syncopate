export const getReviews = () => {
    return fetch("http://localhost:8000/reviews", {
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`
        }
    })
    .then((res) => res.json())
}
export const getSingleReview = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`
        }
    })
    .then((res) => res.json())
}

export const getReviewByMember = (id) => {
    return fetch(`http://localhost:8000/reviews?member=${id}`, {
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`
        }
    })
    .then((res) => res.json())
}

export const getReviewsByLoggedInMember = () => {
    return fetch(`http://localhost:8000/reviews/mine`, {
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`
        }
    })
    .then((res) => res.json())
}

export const addReview = (review) => {
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
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    })
}
export const deleteReview = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Content-Type": "application/json"
    }
    })
}

export const updateReview = (id, reviewBody) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
    method: "PUT",
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewBody),
    });
};

