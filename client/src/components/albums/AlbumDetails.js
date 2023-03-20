import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleAlbum } from "../../managers/AlbumManager"
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import "./Album.css"

export const AlbumDetails = () => {

    const { albumId } = useParams()

    const [album, setAlbum] = useState({})

    useEffect(() => {
        getSingleAlbum(albumId).then((data) => setAlbum(data))
    }, [albumId])

    return (
        <Card className="album" sx={{ maxWidth: 800, padding: 5 }}>
            <CardContent>
                <Stack spacing={2}>
                    <CardMedia
                        component="img"
                        height= "200"
                        image={album?.image_url}
                        title="image"
                    />
                    <Typography className="album__title"> {album?.title}</Typography>
                    <Typography className="album__artist"> {album?.artist}</Typography>
                    <Typography className="album__description"> {album?.description}</Typography>
                    <Typography className="album__category_id"> {album?.genre?.type} </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}