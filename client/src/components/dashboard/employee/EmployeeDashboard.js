import React, { useEffect, useState } from 'react'
import { AotmList } from '../../albums/AotmList'
import { getEmployeeById } from '../../../managers/EmployeeManager'

export const EmployeeDashboard = () => {
    const [employee, setEmployee] = useState({})

    // Fetch employee data and set it in state
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)
    const employeeId = vinylCutUserObject?.employee

    useEffect(() => {
        getEmployeeById(employeeId).then((employeeObject) => {
            setEmployee(employeeObject)
        })
    }, [])

    // Create hero image slider

    const IMAGES_LEFT = [
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1680747819/pexels-photo-1238941_m3c2zf.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681781584/pexels-photo-6069095_rmw33f.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681781602/pexels-photo-15447298_jsm3l5.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681780543/pexels-photo-6827397_h1x1pm.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681783853/pexels-photo-9050184_qtqpxx.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681328646/fahumkdbn6gd8cxsbcc5.jpg',
    ]

    const IMAGES_RIGHT = [
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681783851/pexels-photo-9786210_rmvout.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681781596/pexels-photo-6862369_hzvbmh.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681780544/pexels-photo-11256773_adytap.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681780543/pexels-photo-6827298_nwz0on.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681783573/pexels-koolshooters-6621701_ixzdfp.jpg',
        'https://res.cloudinary.com/dmilofp0z/image/upload/v1681783828/pexels-photo-9050159_ytcln1.jpg',
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
        <>
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
                    <div className="overlay-text margin-top-hero">
                        <h1><span className='welcome' >Welcome back,</span> {employee.first_name}</h1>
                    </div>
                    </div>
                </div>
            </main>
            <div>
                <AotmList />
            </div>
        </>
    )
}