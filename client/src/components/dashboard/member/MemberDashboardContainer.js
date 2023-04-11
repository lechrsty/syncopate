import React, { useEffect, useState } from 'react'
import { MemberAotm } from "./MemberAotm"
import { MemberTaste } from "./MemberTaste"
import { getMemberById } from '../../../managers/MemberManager'
import { getAOTMByTaste } from '../../../managers/AlbumManager'
import { SelectionList } from '../../selections/SelectionList'
import "../Dashboard.css"
import '../../../VinylCut.css'

// Create the member context
export const MemberContext = React.createContext()

// Create the taste context
export const TasteContext = React.createContext()

// Create the AOTM context
export const AOTMContext = React.createContext()

export const MemberDashboardContainer = () => {
    const [aotm, setAOTM] = useState({})
    const [taste, setTaste] = useState(1)
    const [member, setMember] = useState({})

    // Fetch member data and set it in state
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)
    const memberId = vinylCutUserObject?.member

    useEffect(() => {
        getMemberById(memberId).then((memberObject) => {
            setMember(memberObject)

            // Set taste
            const tasteId = memberObject?.taste?.id
            setTaste(tasteId)

            // Fetch album of the month and set it in state
            getAOTMByTaste(tasteId).then((data) => {
                setAOTM(data[0])

            })
        })
    }, [taste])

    const handleTasteUpdate = (newTaste) => {
        setTaste(newTaste)
    }


    // Create hero image slider

    const IMAGES_LEFT = [
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747819/pexels-photo-1238941_m3c2zf.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680749689/pexels-photo-3550240_ufghzf.webp',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747846/pexels-photo-9062566_syty0r.jpg',
    ]

    const IMAGES_RIGHT = [
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747842/pexels-photo-48592_pr7tbd.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747819/pexels-photo-1238941_m3c2zf.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680749689/pexels-photo-3550240_ufghzf.webp',
    ]

    const IMAGES_LEFT_DUPLICATED = Array.from({ length: 100 }, () => IMAGES_LEFT).flat()

    const IMAGES_RIGHT_DUPLICATED = Array.from({ length: 100 }, () => IMAGES_RIGHT).flat()

    const [currentLeftImageIndex, setCurrentLeftImageIndex] = useState(0);
    const [currentRightImageIndex, setCurrentRightImageIndex] = useState(0);

    useEffect(() => {
        let index = 0

        // Cycle through the original IMAGES_LEFT array every 3 seconds (3000 milliseconds)
        const interval = setInterval(() => {
            index = (index + 1) % IMAGES_LEFT_DUPLICATED.length;
            setCurrentLeftImageIndex(index);
            setCurrentRightImageIndex(index);
        }, 3500);

        return () => clearInterval(interval);
    }, [])

    return (
        <MemberContext.Provider value={member}>
            <TasteContext.Provider value={{ taste, handleTasteUpdate }}>
                <AOTMContext.Provider value={aotm}>
                    <main className='content'>
                        <div className="container">
                            <div className="left-panel">
                                <div className="image-container">
                                    {IMAGES_LEFT_DUPLICATED.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            style={{
                                                transform: `translateY(${(index - currentLeftImageIndex) * 100}%)`,
                                                transition: 'transform 1s ease-in-out',
                                                position: index === currentLeftImageIndex ? 'static' : 'absolute'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="right-panel">
                                <div className="image-container">
                                    {IMAGES_RIGHT_DUPLICATED.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            style={{
                                                transform: `translateY(${(index - currentRightImageIndex) * -100}%)`,
                                                transition: 'transform 1s ease-in-out',
                                                position: index === currentRightImageIndex ? 'static' : 'absolute',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                    <main className='aotm-content-wrapper'>
                        <h2 className='aotm-header'> Record of the month</h2>
                    </main>
                    <main className='content-wrapper'>
                        <MemberAotm />
                    </main>
                    <div className='selections-wrapper'>
                        <div className='selections-taste'>
                            <MemberTaste />
                        </div>
                        <div className='selections-list'>
                            <SelectionList />
                        </div>
                    </div>
                </AOTMContext.Provider>
            </TasteContext.Provider>
        </MemberContext.Provider >
    )
}
