import { useContext } from 'react'
import { MemberContext } from '../dashboard/member/MemberDashboardContainer'
import { SelectionCard } from './SelectionCard'

export const SelectionList = () => {
    const member = useContext(MemberContext)

    return (
        <div className="container second">
            {member?.choice_one && (
                <MemberContext.Provider value={member}>
                    <SelectionCard choice={member.choice_one} />
                </MemberContext.Provider>
            )}
            {member?.choice_two && (
                <MemberContext.Provider value={member}>
                    <SelectionCard choice={member.choice_two} />
                </MemberContext.Provider>
            )}
            {member?.choice_three && (
                <MemberContext.Provider value={member}>
                    <SelectionCard choice={member.choice_three} />
                </MemberContext.Provider>
            )}
        </div>
    )
}
