import { useEffect, useState } from "react"
import { useContext } from 'react'
import { MemberContext } from '../dashboard/member/MemberDashboardContainer'
import { TasteContext } from '../dashboard/member/MemberDashboardContainer'
import { getAlbumsByTasteId } from "../../managers/AlbumManager"
import { updateMember } from "../../managers/MemberManager"
import { SelectionCard } from './SelectionCard'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import '../../VinylCut.css'
import "../dashboard/Dashboard.css"

export const SelectionList = () => {
    const member = useContext(MemberContext)
    const { taste } = useContext(TasteContext)
    const tasteId = taste

    // State for modal
    const [open, setOpen] = useState(false)

    // State for album dropdown menu
    const [dropdownAlbums, setDropdownAlbums] = useState([])

    //State to grab id of album that user changes to in the dropdown menu
    const [selectedAlbumId, setSelectedAlbumId] = useState("")

    // Initialize state for choices that will be passed into the PUT request in handleSave 
    const [choices, setChoices] = useState({
        choice_one: '',
        choice_two: '',
        choice_three: '',
    })

    useEffect(() => {
        // Watch if state of choices for member changes (member may not be found on initial render, which will break the handleSave if not updated before
        setChoices({
            choice_one: member.choice_one || '',
            choice_two: member.choice_two || '',
            choice_three: member.choice_three || '',
        });
    }, [member])

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

    // Set selectedAlbumId with the id of the album that is clicked on in select album dropdown
    const handleSelectAlbum = (event) => {
        setSelectedAlbumId(event.target.value)
    }

    // Send PUT request to server with new changes to selected album
    const handleSave = (event) => {
        event.preventDefault()

        const body = {
            choice_one: choices.choice_one,
            choice_two: choices.choice_two,
            choice_three: choices.choice_three,
            taste: { id: tasteId }
        }

        // If member.choice_one is null or undefined, update body with selected album id. If it is truthy, check for member.choice_two... and so on.
        if (!choices.choice_one) {
            body.choice_one = { id: selectedAlbumId }
        } else if (!choices.choice_two) {
            body.choice_two = { id: selectedAlbumId }
        } else if (!choices.choice_three) {
            body.choice_three = { id: selectedAlbumId }
        }

        // Send PUT request with updated body, 
        updateMember(member.id, body).then(() => {
            // Reset the dropdown album list
            setDropdownAlbums([])
            // Close the modal
            handleClose()
            window.location.reload()
        })
    }


    const modalStyle = {
        fontFamily: "'DM Sans', sans-serif",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
    }


    return (
        <>
            <h2 className='selections-header'> Selections </h2>
                <div className="selections-objects">
                    {member?.choice_one ? (
                        <MemberContext.Provider value={member}>
                            <SelectionCard choice={member.choice_one} />
                        </MemberContext.Provider>
                    ) : (
                        <div className="selections-object">
                            <div className="modal-container">
                            <button className="button small modal open"
                                onClick={handleOpen}>Make a selection</button> 
                            </div>
                            </div>
                    )}
                    {member?.choice_two ? (
                        <MemberContext.Provider value={member}>
                            <SelectionCard choice={member.choice_two} />
                        </MemberContext.Provider>
                    ) : (
                        <div className="selections-object">
                            <button className="button small modal"
                                onClick={handleOpen}>Make a selection</button> </div>
                    )}
                    {member?.choice_three ? (
                        <MemberContext.Provider value={member}>
                            <SelectionCard choice={member.choice_three} />
                        </MemberContext.Provider>
                    ) : (
                        <div className="selections-object">
                            <button className="button small modal"
                                onClick={handleOpen}>Make a selection</button> </div>
                    )}

                    <Modal open={open} onClose={handleClose}>
                        <Box sx={modalStyle}>
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

                                <div>
                                    <button className="button small modal-open"
                                        onClick={handleSave}
                                        disabled={!selectedAlbumId}
                                    >
                                        Select album
                                    </button>
                                </div>

                            </FormControl>
                        </Box>
                    </Modal>

                </div>
        </>
    )
}

