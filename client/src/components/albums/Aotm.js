import * as React from 'react'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import "./Album.css"

export const Aotm = ({ aotm }) => {

    return (
        <Card key={`aotm--${aotm.id}`} className="aotm" sx={{ maxWidth: 300 }}>
            <CardContent>
                <Stack spacing={1}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={aotm?.album?.image_url}
                        title="image"
                    />
                    <Link className="card-link"
                        href={`/albums/${aotm?.album?.id}`}>
                        <Typography variant="h6">{aotm?.album?.title}</Typography></Link>
                    <Typography> {aotm?.album?.artist} </Typography>
                    <Typography> {aotm?.album?.description} </Typography>
                    <Typography paragraph color="text.secondary"> {aotm?.album?.genre?.type}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}