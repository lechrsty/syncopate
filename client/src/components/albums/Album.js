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
        if (window.confirm("Are you sure you want to remove this from inventory?")) {
            window.alert("Album removed from inventory.")
            onDelete(album.id)
        }
    }

    // Get localstorage user object to render Edit and Delete buttons for staff only
    const localVinylCutUser = localStorage.getItem("vinylcut")
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    return (
        <Card key={`album--${album.id}`} className="album" sx={{ maxWidth: 300 }}>
            <CardContent>
                <Stack spacing={1}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={album?.image_url}
                        title="image"
                    />
                    <Link className="card-link"
                        href={`/albums/${album.id}`}>
                        <Typography variant="h6">{album.title}</Typography></Link>
                    <Typography> {album?.artist} </Typography>
                    <Typography paragraph color="text.secondary"> {album?.genre?.type}</Typography>


                    {vinylCutUserObject?.staff === true
                        ? <>
                            <Button className="button" variant="contained" onClick={() => {
                                navigate(`/edit/${album.id}`)
                            }}>Edit</Button>
                            <Button className="button" variant="contained" onClick={handleDelete}>Delete</Button>
                        </>
                        : null
                    }

                </Stack>
            </CardContent>
        </Card>
    )
}