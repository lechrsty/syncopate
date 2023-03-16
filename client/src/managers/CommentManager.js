export const getCommentsByReviewId = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/comments?review=${id}`, {
        headers: {
            "Authorization" : `Token ${token}`
        }
    })
        .then(res => res.json())
}

export const addComment = (reviewId, body) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/reviews/${reviewId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Token ${token}`
        },
        body: JSON.stringify(body)
    })
}

export const deleteComment = (id) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token

    return fetch(`http://localhost:8000/reviews/${id}/delete_comment`, {
        method: "DELETE",
        headers: {
            "Authorization" : `Token ${token}`
        },
})
}