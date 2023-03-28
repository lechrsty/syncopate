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
            {
                aotms.map((aotm) => {
                    return <Aotm
                        aotm={aotm}
                        key={`aotm--${aotm.id}`} />
                })
            }
        </>
    )
}