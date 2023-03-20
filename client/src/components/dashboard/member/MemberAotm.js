import React, { useEffect, useState } from 'react'
import { getAOTMByTaste } from '../../../managers/AlbumManager'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import { getMemberById } from '../../../managers/MemberManager'

export const MemberAotm = ({ aotm }) => {
    const localVinylCutUser = localStorage.getItem("vinylcut");
    const vinylCutUserObject = JSON.parse(localVinylCutUser);

    const memberId = vinylCutUserObject?.member;

    const [album, setAlbum] = useState();

    const [taste, setTaste] = useState(null);

    useEffect(() => {
        getMemberById(memberId).then((memberObject) => {
            const tasteId = taste?.id || memberObject?.taste?.id;
            getAOTMByTaste(tasteId).then((data) => {
                setAlbum(data[0]);
            });
        });
    }, [memberId, taste]);

    useEffect(() => {
        if (aotm) {
            setTaste(aotm.taste);
        }
    }, [aotm]);

    return (
        <Card key={`aotm--${aotm?.id}`} className="album" sx={{ maxWidth: 300 }}>
            <CardContent>
                <Stack spacing={1}>
                    <CardMedia sx={{ height: 200 }} image={aotm?.album?.image_url} title="image" />
                    <Link className="card-link" href={`/albums/${aotm?.album?.id}`}>
                        <Typography variant="h6">{aotm?.album?.title}</Typography>
                    </Link>
                    <Typography>{aotm?.album?.artist}</Typography>
                    <Typography>{aotm?.album?.description}</Typography>
                    <Typography paragraph color="text.secondary">
                        {aotm?.album?.genre?.type}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};