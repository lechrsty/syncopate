import axios from 'axios'

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

export const createReview = (review, image) => {
    const auth = localStorage.getItem("vinylcut")
    const token = JSON.parse(auth).token
    
    const newReview = {
        title: review.title,
        artist: review.artist,
        description: review.description,
        genre: parseInt(review.genre),
        rating: parseInt(review.rating),
        image_url: image, 
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

// export const createReview = async (review) => {
//     const auth = localStorage.getItem("vinylcut");
//     const token = JSON.parse(auth).token;
//     let imageUrl = review.image_url;
    
//     if (review.image_url && typeof review.image_url !== 'string') {
//         // If image_url is a File object, upload to Cloudinary and get secure_url
//         const formData = new FormData();
//         formData.append("file", review.image_url);
//         formData.append("upload_preset", "vinylcut");
//         const response = await axios.post(
//             "https://api.cloudinary.com/v1_1/dmilofp0z/image/upload",
//             formData
//         );
//         imageUrl = response.data.secure_url;
//     }
    
//     const newReview = {
//         title: review.title,
//         artist: review.artist,
//         description: review.description,
//         genre: parseInt(review.genre),
//         rating: parseInt(review.rating),
//         image_url: imageUrl,
//         approved : 1
//     };
    
//     return fetch("http://localhost:8000/reviews", {
//         method: "POST",
//         headers: {
//             "Authorization" : `Token ${token}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newReview)
//     });
// };

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

