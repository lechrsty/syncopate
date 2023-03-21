import * as React from 'react'
import { useState } from "react"

export const EditTaste = ({ memberId, currentTaste, tastes, onUpdate }) => {

    const [newTaste, setNewTaste] = useState(currentTaste)

    const handleSelectChange = (event) => {
        const selectedTaste = tastes.find(taste => taste.id === parseInt(event.target.value))
        setNewTaste(selectedTaste)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onUpdate(memberId, newTaste)
        window.location.reload()

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="newTaste">Update Taste:</label>
            <select id="newTaste" value={newTaste.id} onChange={handleSelectChange}>
                {tastes.map((taste) => (
                    <option key={taste.id} value={taste.id}>
                        {taste.type}
                    </option>
                ))}
            </select>
            <button type="submit">Update</button>
        </form>
    )
}