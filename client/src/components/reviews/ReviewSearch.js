export const ReviewSearch = ({ setterFunction }) => {
    return (
        <div className="wrap">
            <input className="search"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" placeholder="Search reviews" />
        </div>
    )
}