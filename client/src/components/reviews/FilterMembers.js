import { useEffect, useState } from "react"
import { getMembers } from "../../managers/MemberManager"

export const FilterMembers = ({ setMemberSelection }) => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        getMembers().then((memberData) => setMembers(memberData))
    }, [])

    return (
        <>
            <section>
                <h2>Search by member</h2>
                <select onChange={(event) => { setMemberSelection(parseInt(event.target.value)) }}>
                    <option value="0" name="member_id" >All members</option>
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
