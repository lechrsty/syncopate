export const ReviewSearch = ({ setterFunction }) => {
    return (
        <div className="search-contents">

            <img
                className="icon"
                src="https://res.cloudinary.com/dmilofp0z/image/upload/v1681277471/noun-eye-5653162-FFFFFF_koefwl.svg" alt="eye-icon" />

            <div className="search-container">
                <input className="search"
                    onChange={
                        (changeEvent) => {
                            setterFunction(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="Search reviews" />
            </div>

            <img
                className="icon"
                src="https://res.cloudinary.com/dmilofp0z/image/upload/v1681277471/noun-eye-5653162-FFFFFF_koefwl.svg" alt="eye-icon" />
        </div>
    )
}