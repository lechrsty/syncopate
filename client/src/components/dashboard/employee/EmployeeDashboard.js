import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AotmList } from '../../albums/AotmList'
import './EmployeeDashboard.css'
import '../Dashboard.css'
import '../../albums/Album.css'


export const EmployeeDashboard = () => {

    const navigate = useNavigate()

    return (
        <>
            <article className="profile-list-container">
                <div className="profile-dashboard-container">
                    <div className='button-box' style={{textAlign: 'center', alignContent:'center', justifyContent:'center', paddingBottom:'20px' }}>
                        <button
                            className="button btn-bigger"
                            variant="contained"
                            onClick={() => {
                                navigate(`/upload`)
                            }}><span>DROP AN ALBUM</span>
                        </button>
                    </div>
                    <div className='album-list-container'>
                        <AotmList />
                    </div>
                </div>
            </article>
        </>
    )
}