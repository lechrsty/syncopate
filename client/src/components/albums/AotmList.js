import * as React from 'react'
import { useEffect, useState } from "react"
import { getAOTMs } from '../../managers/AlbumManager'
import { Aotm } from './Aotm'

export const AotmList = (props) => {

    // Initialize and set state for list of AOTMs
    const [aotms, setAotms] = useState([])

    useEffect(
        () => {
            getAOTMs().then(data => setAotms(data))
        }, [])

    return (
        <>
        <main className='aotm-content-wrapper border-bottom margin-top-40'>
                <h2 className='aotm-header'> Records of the month</h2>
            </main>
            <div className='list-container'>
                {
                    aotms.map((aotm) => {
                        return <Aotm
                            aotm={aotm}
                            key={`aotm--${aotm.id}`} />
                    })
                }
            </div>
            <div className='space-above'></div>
        </>
    )
}