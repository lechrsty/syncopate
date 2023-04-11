import { useEffect, useState } from "react"
import { useContext } from 'react'
import { MemberContext } from '../dashboard/member/MemberDashboardContainer'
import { TasteContext } from '../dashboard/member/MemberDashboardContainer'
import { getAlbumsByTasteId } from "../../managers/AlbumManager"
import { updateMember } from "../../managers/MemberManager"
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Link } from "react-router-dom"
import '../../VinylCut.css'
import "../dashboard/Dashboard.css"


export const SelectionCard = ({ choice }) => {
    const member = useContext(MemberContext)
    const { taste } = useContext(TasteContext)
    const tasteId = taste

    // State for modal
    const [open, setOpen] = useState(false)

    //State to grab id of album that user changes to in the dropdown menu
    const [selectedAlbumId, setSelectedAlbumId] = useState("")

    // State for album dropdown menu
    const [dropdownAlbums, setDropdownAlbums] = useState([])

    // Initialize state for choices that will be passed into the PUT request in handleSave 
    const [choices, setChoices] = useState({
        choice_one: member.choice_one,
        choice_two: member.choice_two,
        choice_three: member.choice_three,
    })

    // Get albums for the dropdown
    useEffect(() => {
        getAlbumsByTasteId(taste).then((data) => {
            setDropdownAlbums(data)
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
            body.choice_one = { id: selectedAlbumId }
        } else if (choices.choice_two && choices.choice_two.id === choice.id) {
            body.choice_two = { id: selectedAlbumId }
        } else if (choices.choice_three && choices.choice_three.id === choice.id) {
            body.choice_three = { id: selectedAlbumId }
        }


        updateMember(member.id, body).then(() => {
            setDropdownAlbums([])
            handleClose()
            window.location.reload()
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

        <div className="selections-card">
            <div className="image-container">
                <img className="selections-image" src={choice?.image_url} />
                <button className="button small card" onClick={handleOpen}>
                    Change
                </button>
            </div>

            <a href={`/albums/${choice.id}`}>
                {choice.title.length > 25 ? (
                    <div className="marquee-container" style={{ paddingTop: "20px" }}>
                        <marquee direction="up" scrollamount="2" height="50px" scrollDelay="0">
                            {[...Array(50)].map((_, i) => (
                                <p className="selections-title" style={{ marginTop: '10px' }} key={i}>{choice.title}</p>
                            ))}
                        </marquee>
                    </div>
                ) : (
                    <p className="selections-title">{choice.title}</p>
                )}
            </a>

            <p className="selections-artist">{choice?.artist}</p>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Switch
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
                            {dropdownAlbums
                                .filter((album) => {
                                    return (
                                        album.id !== choices.choice_one?.id &&
                                        album.id !== choices.choice_two?.id &&
                                        album.id !== choices.choice_three?.id
                                    );
                                })
                                .map((album) => (
                                    <MenuItem key={album.id} value={album.id}>
                                        {album.title} - {album.artist}
                                    </MenuItem>
                                ))}
                        </Select>

                        <button
                            onClick={handleSave}
                            disabled={!selectedAlbumId}
                        >
                            Choose this one
                        </button>
                    </FormControl>
                </Box>
            </Modal>

        </div>
    )
}
