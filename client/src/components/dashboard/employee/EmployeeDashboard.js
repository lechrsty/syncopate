import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AotmList } from '../../albums/AotmList'

export const EmployeeDashboard = () => {

    const navigate = useNavigate()

    return (
        <>
            <div>
                <button
                    onClick={() => {
                        navigate(`/upload`)
                    }}>Drop an album
                </button>
            </div>
            <div>
                <AotmList />
            </div>
        </>
    )
}