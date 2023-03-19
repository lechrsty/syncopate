import * as React from 'react'
import { useEffect, useState } from "react"
import { getAOTMs } from '../../managers/AlbumManager'
import { Aotm } from './Aotm'
import "./Album.css"

export const AotmList = (props) => {

    // Initialize and set state for list of AOTMs
    const [aotms, setAotms] = useState([])

    useEffect(
        () => {
            getAOTMs().then(data => setAotms(data))
        }, [])

    return (
        <>
            <article className="aotm-list-container">

                {
                    aotms.map((aotm) => {
                        return <Aotm
                        aotm={aotm} 
                        key={`aotm--${aotm.id}`} />
                    })
                }

            </article>
        </>
    )
}