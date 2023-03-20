import { useEffect, useState } from "react"
import { useContext } from 'react'
import { MemberContext } from '../dashboard/member/MemberDashboardContainer'
import { TasteContext } from '../dashboard/member/MemberDashboardContainer'
import { getAlbumsByTasteId } from "../../managers/AlbumManager"
import { getMemberById } from "../../managers/MemberManager"
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

export const SelectionList = () => {
    const member = useContext(MemberContext)
    const { taste } = useContext(TasteContext)

    // State for modal
    const [open, setOpen] = useState(false)
    const [selectedAlbumId, setSelectedAlbumId] = useState('')

    // Handle opening and closing of modal
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    //  Initialize state to set Dropdown for Albums
    const [albums, setAlbums] = useState([])

    useEffect(
        () => {
            getAlbumsByTasteId(taste)
                .then((data) => {
                    setAlbums(data)
                })
        }, [taste])

    // Handle selecting an album from the dropdown
    const handleSelectAlbum = (event) => {
        setSelectedAlbumId(event.target.value)
    }

    // Handle saving the selected album
    const handleSave = (event) => {
        event.preventDefault()

        // Fetch the Member object
        getMemberById(member.id)
            .then((memberObject) => {
                // Extract the taste ID from the member object
                const tasteId = memberObject.taste.id

                // Create the PUT body with the selected album and extracted taste ID
                const body = {
                    album: { id: selectedAlbumId },
                    taste: { id: tasteId },
                };

                // Update the AOTM with the new album and taste
                updateMember(member.id, body).then(() => {
                    // Reset the albums state
                    setAlbums([])
                })

                // Close the modal
                handleClose()
            })
    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    }

    return (
        <>
            <div className="container second">

                {member?.choice_one && (
                    <Card sx={{ maxWidth: '300px', minHeight: "500px", maxHeight: '500px' }}>
                        <CardContent>
                            <Stack spacing={1}>
                                <CardMedia
                                    component="img"
                                    image={member?.choice_one?.image_url}
                                />
                                <Link className="card-link"
                                    href={`/albums/${member?.choice_one?.id}`}>
                                    <Typography variant="h6">{member?.choice_one?.title}</Typography></Link>
                                <Typography> {member?.choice_one?.artist} </Typography>
                                <Typography paragraph color="text.secondary" >{member?.choice_one?.genre?.type} </Typography>
                                <>
                                    <Button
                                        className="button"
                                        variant="contained"
                                        onClick={() => {
                                            setOpen(true)
                                        }}
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
                                        onChange={(e) => setSelectedAlbumId(e.target.value)}
                                    >
                                        {albums?.map((album) => (
                                            <MenuItem key={album.id} value={album.id}>
                                                {album.title} - {album.artist}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={handleSave}>
                                    Save
                                </Button>
                            </Box>
                        </Modal>
                    </Card>
                )}


                {member?.choice_two && (
                    <Card sx={{ maxWidth: '300px', minHeight: "500px", maxHeight: '500px', }} >
                        <CardContent>
                            <Stack spacing={1}>
                                <CardMedia
                                    component="img"
                                    image={member?.choice_two?.image_url}
                                />
                                <Link className="card-link"
                                    href={`/albums/${member?.choice_two?.id}`}>
                                    <Typography variant="h6">{member?.choice_two?.title}</Typography></Link>
                                <Typography> {member?.choice_two?.artist} </Typography>
                                <Typography paragraph color="text.secondary" >{member?.choice_two?.genre?.type} </Typography>
                                <>
                                    <Button
                                        className="button"
                                        variant="contained"
                                        onClick={() => {
                                            setOpen(true)
                                        }}
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
                                        onChange={(e) => setSelectedAlbumId(e.target.value)}
                                    >
                                        {albums?.map((album) => (
                                            <MenuItem key={album.id} value={album.id}>
                                                {album.title} - {album.artist}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={handleSave}>
                                    Save
                                </Button>
                            </Box>
                        </Modal>
                    </Card>
                )}

                {member?.choice_three && (
                    <Card sx={{ maxWidth: '300px', minHeight: "500px", maxHeight: '500px' }} >
                        <CardContent>
                            <Stack spacing={1}>
                                <CardMedia
                                    component="img"
                                    image={member?.choice_three?.image_url}
                                />
                                <Link className="card-link"
                                    href={`/albums/${member?.choice_three?.id}`}>
                                    <Typography variant="h6">{member?.choice_three?.title}</Typography></Link>
                                <Typography> {member?.choice_three?.artist} </Typography>
                                <Typography paragraph color="text.secondary" >{member?.choice_three?.genre?.type} </Typography>
                                <>
                                    <Button
                                        className="button"
                                        variant="contained"
                                        onClick={() => {
                                            setOpen(true)
                                        }}
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
                                        onChange={(e) => setSelectedAlbumId(e.target.value)}
                                    >
                                        {albums?.map((album) => (
                                            <MenuItem key={album.id} value={album.id}>
                                                {album.title} - {album.artist}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={handleSave}>
                                    Save
                                </Button>
                            </Box>
                        </Modal>
                    </Card>
                )}


            </div>
        </>
    )
}