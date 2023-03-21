import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AotmList } from '../../albums/AotmList'
import Button from '@mui/material/Button'
import "../Dashboard.css"

export const EmployeeDashboard = () => {

    const navigate = useNavigate()

    // Fetch employee data and set it in state
    // const localVinylCutUser = localStorage.getItem("vinylcut")
    // const vinylCutUserObject = JSON.parse(localVinylCutUser)
    // const employeeId = vinylCutUserObject?.employee

    return (
        <>
            {/* <h1>Welcome {employee?.full_name}!</h1> */}
            <Button
                className="button"
                variant="contained"
                onClick={() => {
                    navigate(`/upload`)
                }}>Drop an Album
            </Button>
            <AotmList />
        </>
    )
}