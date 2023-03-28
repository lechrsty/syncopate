import React from 'react'
import { useContext } from 'react'
import { AOTMContext } from './MemberDashboardContainer'

export const MemberAotm = () => {
    const aotm = useContext(AOTMContext)

    return (
        <div key={`aotm--${aotm?.album?.id}`}>
            <h2>Record of the Month</h2>
            <div>
                <a href={`/albums/${aotm?.album?.id}`}>
                    <img
                        src={aotm?.album?.image_url} />
                </a>
            </div>
            <p> {aotm?.album?.artist} </p>
            <p> {aotm?.album?.genre?.type} </p>
        </div>
    )
}