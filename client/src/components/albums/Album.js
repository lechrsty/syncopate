import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import "./Album.css"

export const Album = ({ album, onDelete }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        onDelete(album.id)
    }

    return (
        <Card key={`album--${album.id}`} className="album" sx={{ maxWidth: 300 }}>
            <CardContent>
                <Stack spacing={1}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={album?.image_url}
                        title="image"
                    />
                    <Link className="card-link"
                        href={`/albums/${album.id}`}>
                        <Typography variant="h6">{album.title}</Typography></Link>
                    <Typography> {album?.artist} </Typography>
                    <Typography> {album?.description} </Typography>
                    <Typography paragraph color="text.secondary"> {album?.genre?.type}</Typography>
                    <Button className="button" variant="contained" onClick={() => {
                        navigate(`/edit/${album.id}`)
                    }}>Edit</Button>
                    <Button className="button" variant="contained"
                        onClick={handleDelete}
                    >Delete</Button>

                </Stack>
            </CardContent>
        </Card>
    )
}