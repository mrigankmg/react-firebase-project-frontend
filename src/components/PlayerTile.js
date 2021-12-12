import React, { 
    useState,
    useRef
} from 'react'
import { 
    Card,
    Avatar,
    CardActions,
    CardContent,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import {
    functions,
    storage
} from '../firebase'
import { colours } from '../constants/colours'
import { useAuth } from '../contexts/AuthContext'

const PlayerTile = ({ colour, name, photoDownloadUrl }) => {
    const[colourPickerDisabled, setColourPickerDisabled] = useState(false)
    const[browseFilesDisabled, setBrowseFilesDisabled] = useState(false)
    const { allPlayers, setError, currentUser } = useAuth()
    const photoInputRef = useRef()

    const handleColourChange = async e => {
        e.preventDefault()
        try {
            setError('')
            setColourPickerDisabled(true)
            await functions.httpsCallable('changeColour')({ colour: e.target.value })
        } catch {
            setError('Unable to update colour.')
        }
        setColourPickerDisabled(false)
    }

    const handleImageClick = () => {
        photoInputRef.current.click()
    }

    const handleImageChange = async e => {
        const fileList = e.target.files;
        if (fileList.length > 0) {
            const file = fileList[0]
            const acceptedFileTypes = new Set(['image/png', 'image/jpg', 'image/jpeg', 'image/gif'])
            if (acceptedFileTypes.has(file.type)) {
                setError('')
                setBrowseFilesDisabled(true)
                const storageRef = storage.ref()
                const extension = file.name.split('.')[1]
                const fileRef = storageRef.child(`${ currentUser.uid }.${ extension }`)
                try {
                    await fileRef.put(file)
                    const url = await fileRef.getDownloadURL()
                    await functions.httpsCallable('updatePhotoDownloadUrl')({ url })
                } catch {
                    setError('Unable to update picture.')
                }
                setBrowseFilesDisabled(false)
            } else {
                setError('Please select an image of type png/jpg/jpeg/gif.')
            }
        }
    }

    const availableColours = () => {
        const nonLoggedInPlayerColours = new Set()
        allPlayers.forEach(player => {
            if (player.colour !== colour) {
                nonLoggedInPlayerColours.add(player.colour)
            }
        })
        return colours.filter(
            colour => !nonLoggedInPlayerColours.has(colour.value)
        )
    }

    const renderColourOptions = () => {
        return availableColours().map((colour, idx) => 
            <MenuItem 
                value={colour.value}
                key={`colour-${ idx }`}>
                { colour.label }
            </MenuItem>
        )
    }

    const getBorder = () => {
        if (colour === '' && availableColours().length > 0) {
            return 'thin solid #606060'
        }
        return null
    }

    return (
        <Card sx={{ 
            maxWidth: '350px',
            margin: "auto"
        }}>
            <CardContent
                sx={{ 
                    backgroundColor: colour,
                    padding: "24px",
                    borderBottom: getBorder()
                }}>
                <Avatar
                    alt={`${ name }'s avatar'`}
                    src={ photoDownloadUrl } 
                    sx={{ 
                        height: '120px',
                        width: '120px',
                        '&:hover': {
                            cursor: "pointer"
                        },
                        margin: 'auto'
                    }}
                    onClick={ handleImageClick } />
                <input
                    ref={ photoInputRef }
                    disabled={ browseFilesDisabled }
                    type="file"
                    accept="image/*"
                    onChange={ handleImageChange }
                    hidden
                />
                <Typography
                    variant="h5"
                    sx={{ 
                        color: colour === '' ? '#606060' : 'white',
                        textAlign: 'center',
                        wordBreak: 'break-all',
                        margin: '0',
                        marginTop: '20px'
                    }}>
                    { name }
                </Typography>
            </CardContent>
            {
                availableColours().length > 0 &&
                <CardActions sx={{ padding: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="player-tile-label">Colour</InputLabel>
                        <Select
                            disabled={ colourPickerDisabled }
                            labelId="player-tile-label"
                            value={ colour }
                            label="Colour"
                            onChange={ handleColourChange }>
                            { renderColourOptions() }
                        </Select>
                    </FormControl>
                </CardActions>
            }
        </Card>
    )
}

export default PlayerTile