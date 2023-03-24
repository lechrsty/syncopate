import { useEffect, useState } from "react"
import { getMembers } from "../../managers/MemberManager"
import "./Review.css"

export const FilterMembers = ({ setMemberSelection }) => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        getMembers().then((memberData) => setMembers(memberData))
    }, [])

    return (
        <>
            <section className="reviews__dropdown">
                <h4 htmlFor="search-member">Search By Member</h4>
                <select onChange={(event) => { setMemberSelection(parseInt(event.target.value)) }}>
                    <option value="0" name="member_id" className="form-control">All members</option>
                    {members.map(member => (
                        <option key={`member--${member.id}`} value={member.id}>
                            {member.username}
                        </option>
                    ))}
                </select>
                <br></br>
            </section>
        </>
    )
}
