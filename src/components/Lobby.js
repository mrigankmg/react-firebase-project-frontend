import { 
    Container,
    Button,
    Alert,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@mui/material';
import PlayerTile from './PlayerTile'
import { useAuth } from '../contexts/AuthContext'
import React from 'react';

const Lobby = () => {
    const { currentUser, allPlayers, logOut, error } = useAuth()

    const renderPlayerTile = () => {
        const loggedInPlayer = allPlayers.find(player => currentUser.uid === player.id)
        if (loggedInPlayer) {
            return (
                <PlayerTile
                    colour={ loggedInPlayer.colour }
                    name={ loggedInPlayer.name }
                    photoDownloadUrl={ loggedInPlayer.photoDownloadUrl }
                    key={ loggedInPlayer.id } />
            )
        }
        return null
    }

    const renderNonLoggedInPlayersListItems = () => {
        const listItems = []
        allPlayers.forEach(player =>{
            if (player.id !== currentUser.uid) {
                const doesPlayerHaveColour = player.colour !== ''
                let listItemBackgroundColour = player.colour
                if (!doesPlayerHaveColour) {
                    listItemBackgroundColour = listItems.length % 2 === 0 ? '#F0F0F0' : 'white'
                }
                listItems.push(
                    <React.Fragment key={ player.id }>
                        <ListItem alignItems="flex-start" sx={{
                            backgroundColor: listItemBackgroundColour,
                            display: 'flex',
                            alignItems: 'center',
                            paddingBlock: '24px'
                        }}>
                            <ListItemAvatar sx={{ margin: '0' }}>
                                <Avatar
                                    alt={`${ player.name }'s avatar'`}
                                    src={ player.photoDownloadUrl } 
                                    sx={{
                                        height: '50px',
                                        width: '50px',
                                        marginRight: '16px'
                                    }}/>
                            </ListItemAvatar>
                            <ListItemText primary={ player.name } sx={{
                                color: doesPlayerHaveColour ? 'white' : '#606060',
                                textAlign: 'center',
                                wordBreak: 'break-all',
                                margin: '0'
                            }} />
                        </ListItem>
                    </React.Fragment>
                )
            }
        })
        return listItems
    }

    return (
        <Container sx={{ 
            paddingTop: '20px',
            position: 'relative'
        }}>
            <Button 
                sx={{ 
                    position: 'absolute',
                    top: '20px',
                    right: '20px'
                }}
                color="primary"
                variant="link"
                onClick={ logOut }>
                Log Out
            </Button>
            <Box sx={{ marginTop: '50px'}}>
                { 
                    error && 
                        <Alert 
                            severity="error"
                            sx={{ marginBottom: '20px' }}>
                            { error }
                        </Alert> 
                }
                { renderPlayerTile() }
                <List sx={{
                    maxWidth: '500px',
                    margin: '40px auto'
                }}>
                    { renderNonLoggedInPlayersListItems() }
                </List>
            </Box>
        </Container>
    )

}

export default Lobby