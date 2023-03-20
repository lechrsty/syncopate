import React, { useEffect, useState } from 'react'
import { MemberAotm } from "./MemberAotm"
import { MemberTaste } from "./MemberTaste"
import { getMemberById } from '../../../managers/MemberManager'
import { getAOTMByTaste } from '../../../managers/AlbumManager'
import { SelectionList } from '../../selections/SelectionList'
import "../Dashboard.css"

// Create the member context
export const MemberContext = React.createContext()

// Create the taste context
export const TasteContext = React.createContext()

// Create the AOTM context
export const AOTMContext = React.createContext()

export const MemberDashboardContainer = () => {
    const [aotm, setAOTM] = useState({})
    const [taste, setTaste] = useState(1)
    const [member, setMember] = useState({})
    
    // Fetch member data and set it in state
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)
    const memberId = vinylCutUserObject?.member
    
    useEffect(() => {
        getMemberById(memberId).then((memberObject) => {
            setMember(memberObject)
            
            // Set taste
            const tasteId = memberObject?.taste?.id 
            setTaste(tasteId)
            
            // Fetch album of the month and set it in state
            getAOTMByTaste(tasteId).then((data) => {
                setAOTM(data[0])
                
            })
        })
    }, [memberId])
    
    const handleTasteChange = (newTaste) => {
        setTaste(newTaste)
    }

    return (
        <MemberContext.Provider value={member}>
            <TasteContext.Provider value={{ taste, handleTasteChange }}>
                <AOTMContext.Provider value={aotm}>
                    <MemberTaste />
                    <MemberAotm />
                    <SelectionList />
                </AOTMContext.Provider>
            </TasteContext.Provider>
        </MemberContext.Provider>
    )
}