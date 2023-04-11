import * as React from 'react'
import { useState } from "react"
import { useContext } from 'react'
import { MemberContext } from './MemberDashboardContainer'
import "../Dashboard.css"
import '../../../VinylCut.css'

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="newTaste"></label>
            <div className='taste-wrapper'>
                <h2 className='taste-header'> Taste </h2>
                    <div className='taste-select'>
                        <select className='taste-select-object' id="newTaste" value={newTaste.id} onChange={handleSelectChange}>
                            {tasteDropdown.map((taste) => (
                                <option key={taste.id} value={taste.id}>
                                    {taste.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='taste-button'>
                        <button className='button' type="submit">Update</button>
                    </div>
                </div>
        </form>
    )
}