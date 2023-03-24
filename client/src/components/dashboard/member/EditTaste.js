import * as React from 'react'
import { useState } from "react"
import { useContext } from 'react'
import { MemberContext } from './MemberDashboardContainer'


export const EditTaste = ({ memberId, currentTaste, tasteDropdown, onUpdate }) => {

    const member = useContext(MemberContext)

    const [newTaste, setNewTaste] = useState(currentTaste)

    const handleSelectChange = (event) => {
        const selectedTaste = tasteDropdown.find(taste => taste.id === parseInt(event.target.value))
        setNewTaste(selectedTaste)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onUpdate(memberId, newTaste)
        window.location.reload()
    }

    return (
        <form className='dashboard-taste-box' onSubmit={handleSubmit}>
            <label htmlFor="newTaste"></label>
            <div className='dashboard-select-box'>
                <select style={{ width:'130px' }} id="newTaste" value={newTaste} onChange={handleSelectChange}>
                    {tasteDropdown.map((taste) => (
                        <option key={taste.id} value={taste.id}>
                            {taste.type}
                        </option>
                    ))}
                </select>
            <button className='update-button' type="submit"><span>Update</span></button>
            </div>
        </form>
    )
}