import React from 'react'
import { useContext } from 'react'
import { AOTMContext } from './MemberDashboardContainer'
import { Link } from 'react-router-dom'

export const MemberAotm = () => {
    const aotm = useContext(AOTMContext)

    return (
        <div key={`aotm--${aotm?.album?.id}`} className="aotm" sx={{ maxWidth: 300 }}>
            <h2 className='aotm-header'>RECORD OF THE MONTH</h2>
            <div style={{ paddingLeft:'10px' }} className="aotm-imgBx">
                <a href={`/albums/${aotm?.album?.id}`}>
                    <img style={{ height:'200px', width:'200px' }}
                        src={aotm?.album?.image_url} />
                </a>
            </div>
            <div className='album-contents'>
                <p className='artist' style={{ fontSize: '20px', textAlign: 'center' }}> {aotm?.album?.artist} </p>
                <p className='genre' style={{ fontSize: '15px', textAlign: 'center', color: 'grey', textTransform:'uppercase', marginTop:'-10px' }}> {aotm?.album?.genre?.type} </p>
            </div>
        </div>
    )
}