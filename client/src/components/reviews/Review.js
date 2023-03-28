import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Review = ({ review, onDelete }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to remove this review?")) {
            window.alert("Review removed from the ether.")
            onDelete(review.id)
        }
    }

    return (

        <div key={`review--${review.id}`}>

            <a href={`/reviews/${review.id}`}>
                <img
                    src={review?.image_url} />
            </a>
            <Link to={`/reviews/${review.id}`} >
                <p>{review.title}</p>
            </Link>
            <p> {review?.artist} </p>
            <p> {review?.genre?.type} </p>
            <p> {review?.description.slice(0, 600)}... </p>
            <Link to={`/profile/member/${review.member.id}`}>
                <p className='username'>{review.member.username}</p>
            </Link>
            <p> {review?.rating?.rating}</p>

            <div>
                {
                    review.member.id === JSON.parse(localStorage.getItem('vinylcut')).member
                        ?
                        <>
                            <button onClick={() => {
                                navigate(`/reviews/edit/${review.id}`)
                            }}>Edit</button>
                            <button
                                onClick={handleDelete}
                            >Delete</button>
                        </>
                        :
                        ""
                }
            </div>

        </div >
    )
}