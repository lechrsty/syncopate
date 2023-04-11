import React from 'react'
import { useContext } from 'react'
import { AOTMContext } from './MemberDashboardContainer'
import "../Dashboard.css"
import '../../../VinylCut.css'

export const MemberAotm = () => {
    const aotm = useContext(AOTMContext)

    let description = aotm?.album?.description
    let sentences = description?.split('. ')
    let slicedSentences = sentences?.slice(0, 2)
    let slicedDescription = slicedSentences?.join('. ') + '.'

    return (
        <div className='content-container' key={`aotm--${aotm?.album?.id}`}>
            <div className='aotm-content-container'>
                <p className='album-description'>{slicedDescription}</p>
                <div className='title-artist-wrapper'>
                    <p className='album-title'>{aotm?.album?.title}</p>
                    <div className='image-genre-wrapper'>
                        <a href={`/albums/${aotm?.album?.id}`}>
                            <img className='album-image' src={aotm?.album?.image_url} />
                        </a>
                    </div>
                    <p className='album-artist'>{aotm?.album?.artist}</p>
                </div>
                <p className='album-genre'>{aotm?.album?.genre?.type}</p>
            </div>
        </div>
    )
}