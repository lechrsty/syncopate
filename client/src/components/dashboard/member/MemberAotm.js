import React from 'react'
import { useContext } from 'react'
import { AOTMContext } from './MemberDashboardContainer'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'

export const MemberAotm = ( ) => {
    const aotm = useContext(AOTMContext)

    return (
        <Card key={`aotm--${aotm?.album?.id}`} className="album" sx={{ maxWidth: 300 }}>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h5" >Record of the Month</Typography>
                    <CardMedia component="img"
                        height="200"
                        image={aotm?.album?.image_url}
                        title="image"
                    />
                    <Link className="card-link" href={`/albums/${aotm?.id}`}>
                        <Typography variant="h6">{aotm?.album?.title}</Typography>
                    </Link>
                    <Typography>{aotm?.artist}</Typography>
                    <Typography paragraph color="text.secondary">
                        {aotm?.album?.genre?.type}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}