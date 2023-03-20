import React, { useEffect, useState } from 'react'
import { MemberAotm } from "./MemberAotm"
import { MemberTaste } from "./MemberTaste"
import { getMemberById } from '../../../managers/MemberManager';
import { getAOTMByTaste } from '../../../managers/AlbumManager';
import "../Dashboard.css"

export const MemberDashboardContainer = () => {
    const [aotm, setAOTM] = useState(null);
    const [taste, setTaste] = useState(null);

    const handleTasteChange = (newTaste) => {
        setTaste(newTaste);
    };

    useEffect(() => {
        // Get logged in member's ID
        const localVinylCutUser = localStorage.getItem("vinylcut");
        const vinylCutUserObject = JSON.parse(localVinylCutUser);
        const memberId = vinylCutUserObject?.member;

        // Get member object and taste ID
        getMemberById(memberId).then((memberObject) => {
            const tasteId = taste?.id || memberObject?.taste?.id;

            // Get AOTM for the taste ID
            getAOTMByTaste(tasteId).then((data) => {
                setAOTM(data[0]);
            });
        });
    }, [taste]);

    return (
        <>
            <MemberAotm aotm={aotm} taste={taste} />
            <MemberTaste onTasteChange={handleTasteChange} />
        </>
    );
};
