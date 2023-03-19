import * as React from 'react'
import { useEffect, useState } from 'react'
import { getMemberById } from '../../managers/MemberManager'
import { getTastes, updateTaste } from '../../managers/TasteManager'
import { EditTaste } from '../tastes/EditTaste'
import "./Dashboard.css"

export const MemberDashboard = () => {

  // Initialize and state for logged in Member
  const [member, setMember] = useState(null)

  useEffect(() => {
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)
    if (vinylCutUserObject) {
      getMemberById(vinylCutUserObject.member).then((memberData) => {
        setMember(memberData)

        // Initialize and set state for Member to update Taste, and set current Taste so Member can see what they have selected before change
        getTastes().then((tastesData) => {
          const currentTaste = tastesData.find(taste => taste.id === memberData.taste.id)
          setTastes([currentTaste, ...tastesData.filter(taste => taste.id !== memberData.taste.id)])
        })
      })
    }
  }, [])

  const [tastes, setTastes] = useState([])

  // PUT request to update Member's Taste
  const handleTasteUpdate = (memberId, newTaste) => {
    updateTaste(memberId, newTaste)
      .then(() => {
        getMemberById(memberId).then((memberData) => {
          setMember(memberData)
        })
      })
  }

  return (
    <div>
      {member ? (
        <>
          <h1>Welcome {member.full_name}!</h1>
          <p>Your current taste is: {member.taste.type}</p>
          <EditTaste
            memberId={member.id}
            currentTaste={member.taste}
            tastes={tastes}
            onUpdate={handleTasteUpdate}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
