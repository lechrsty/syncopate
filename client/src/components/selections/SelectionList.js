import { useContext } from 'react'
import { MemberContext } from '../dashboard/member/MemberDashboardContainer'
import { SelectionCard } from './SelectionCard'

export const SelectionList = () => {
    const member = useContext(MemberContext)

    return (
        <div className="container second">
            {member?.choice_one && (
                <SelectionCard
                    choice={member.choice_one}
                />
            )}
            {member?.choice_two && (
                <SelectionCard
                    choice={member.choice_two}

                />
            )}
            {member?.choice_three && (
                <SelectionCard
                    choice={member.choice_three}

                />
            )}
        </div>
    )
}
