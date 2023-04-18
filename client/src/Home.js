import React, { useEffect, useState } from 'react'
import "./VinylCut.css"

export const Home = () => {

    // Create hero image slider

    const IMAGES_LEFT = [
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747819/pexels-photo-1238941_m3c2zf.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680749689/pexels-photo-3550240_ufghzf.webp',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747846/pexels-photo-9062566_syty0r.jpg',
    ]

    const IMAGES_RIGHT = [
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747846/pexels-photo-9062566_syty0r.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747819/pexels-photo-1238941_m3c2zf.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680749689/pexels-photo-3550240_ufghzf.webp',
    ]

    const IMAGES_LEFT_DUPLICATED = Array.from({ length: 100 }, () => IMAGES_LEFT).flat()

    const IMAGES_RIGHT_DUPLICATED = Array.from({ length: 100 }, () => IMAGES_RIGHT).flat()

    const [currentLeftImageIndex, setCurrentLeftImageIndex] = useState(0)
    const [currentRightImageIndex, setCurrentRightImageIndex] = useState(0);

    useEffect(() => {
        let index = 0

        // Cycle through the original IMAGES_LEFT array every 3 seconds (3000 milliseconds)
        const interval = setInterval(() => {
            index = (index + 1) % IMAGES_LEFT_DUPLICATED.length
            setCurrentLeftImageIndex(index)
            setCurrentRightImageIndex(index)
        }, 3500);

        return () => clearInterval(interval)
    }, [])


    return (
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
                <div className="overlay-text">
                    <h1>VINYL CUT</h1>
                </div>
            </div>
        </main>

    )
}