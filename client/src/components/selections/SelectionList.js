import { useEffect, useState } from "react"
import { useContext } from 'react'
import { MemberContext } from '../dashboard/member/MemberDashboardContainer'
import { TasteContext } from '../dashboard/member/MemberDashboardContainer'
import { getAlbumsByTasteId } from "../../managers/AlbumManager"
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export const SelectionList = () => {
    const  member  = useContext(MemberContext)
    const { taste } = useContext(TasteContext)
    
    //  Initialize state to set Dropdown for Albums
    const [albumDropdown, setAlbumDropdown] = useState([])

    useEffect(
        () => {
            getAlbumsByTasteId(taste)
                .then((data) => {
                    setAlbumDropdown(data)
                })
        }, [taste])

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
                            </Stack>
                        </CardContent>
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
                            </Stack>
                        </CardContent>
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
                            </Stack>
                        </CardContent>
                    </Card>
                )}


            </div>
        </>
    )
}