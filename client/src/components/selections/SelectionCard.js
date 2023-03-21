import { useEffect, useState } from "react"
import { useContext } from 'react'
import { MemberContext } from '../dashboard/member/MemberDashboardContainer'
import { TasteContext } from '../dashboard/member/MemberDashboardContainer'
import { getAlbumsByTasteId } from "../../managers/AlbumManager"
import { updateMember } from "../../managers/MemberManager"
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export const SelectionCard = ({ choice }) => {
    const member = useContext(MemberContext)
    const { taste } = useContext(TasteContext)
    const tasteId = taste

    const [open, setOpen] = useState(false)
    const [selectedAlbumId, setSelectedAlbumId] = useState("")
    const [albums, setAlbums] = useState([])
    
    const [choices, setChoices] = useState({
        choice_one: member.choice_one,
        choice_two: member.choice_two,
        choice_three: member.choice_three,
    })

    // Get albums for the dropdown
    useEffect(() => {
        getAlbumsByTasteId(taste).then((data) => {
            setAlbums(data)
        })
    }, [taste])

    // Handle open and close for modal
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // Handle changes to selected album
    const handleSelectAlbum = (event) => {
        setSelectedAlbumId(event.target.value)
    }

    // Send PUT request to server with new changes to selected album
    const handleSave = (event) => {
        event.preventDefault()

        const body = {
            choice_one: member.choice_one,
            choice_two: member.choice_two,
            choice_three: member.choice_three,
            taste: { id: tasteId }
        }

        if (choices.choice_one && choices.choice_one.id === choice.id) {
            body.choice_one = { id: selectedAlbumId };
        } else if (choices.choice_two && choices.choice_two.id === choice.id) {
            body.choice_two = { id: selectedAlbumId };
        } else if (choices.choice_three && choices.choice_three.id === choice.id) {
            body.choice_three = { id: selectedAlbumId };
        }

        updateMember(member.id, body).then(() => {
            setAlbums([])
            handleClose()
        })
    }

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    }

    return (
        <Card sx={{ maxWidth: "300px", minHeight: "500px", maxHeight: "500px" }}>
            <CardContent>
                <Stack spacing={1}>
                    <CardMedia component="img" image={choice.image_url} />
                    <Link className="card-link" href={`/albums/${choice.id}`}>
                        <Typography variant="h6">{choice.title}</Typography>
                    </Link>
                    <Typography> {choice.artist} </Typography>
                    <Typography paragraph color="text.secondary">
                        {choice.genre?.type}
                    </Typography>
                    <>
                        <Button
                            className="button"
                            variant="contained"
                            onClick={handleOpen}
                        >
                            Change
                        </Button>
                    </>
                </Stack>
            </CardContent>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Switch Album
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Album</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedAlbumId}
                            label="Album"
                            onChange={handleSelectAlbum}
                        >
                            {albums.map((album) => (
                                <MenuItem key={album.id} value={album.id}>
                                    {album.title} - {album.artist}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            className="button"
                            variant="contained"
                            onClick={handleSave}
                            disabled={!selectedAlbumId}
                        >
                            Choose this one
                        </Button>
                    </FormControl>
                </Box>
            </Modal>
        </Card>
    )
}