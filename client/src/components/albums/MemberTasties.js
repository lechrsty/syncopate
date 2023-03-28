import React from 'react'
import { TasteAlbumList } from './TasteAlbumList'

export const MemberTasties = () => {

    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)
    
    return <TasteAlbumList tasteId="4" />
}
