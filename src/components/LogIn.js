import React, { useRef } from 'react'
import { 
    Card,
    CardContent,
    Typography,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { signUp } from '../constants/routes'

const LogIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { logIn, error } = useAuth()

    const handleLogIn = e => {
        e.preventDefault()
        logIn(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography
                        variant="h3"
                        sx={{ textAlign: 'center' }}>
                        Log In
                    </Typography>
                    { error && 
                        <Alert 
                            severity="error"
                            sx={{ marginTop: '20px' }}>
                            { error }
                        </Alert> 
                    }
                    <form onSubmit={ handleLogIn }>
                        <FormGroup 
                            id="email"
                            sx={{ marginTop: '20px' }}>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <TextField
                                type="email"
                                sx={{ marginTop: '10px' }}
                                inputRef={ emailRef }
                                variant="standard"
                                required />
                        </FormGroup>
                        <FormGroup 
                            id="password"
                            sx={{ marginTop: '20px' }}>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <TextField
                                type="password"
                                sx={{ marginTop: '10px' }}
                                inputRef={ passwordRef }
                                variant="standard"
                                required />
                        </FormGroup>
                        <Button 
                            fullWidth
                            disableElevation
                            sx={{ marginTop: '40px', paddingBlock: "10px" }}
                            color="primary"
                            variant="outlined"
                            type="submit">
                            Log In
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Typography
                variant="body1"
                sx={{ 
                    textAlign: 'center',
                    margin: 0,
                    marginTop: '20px'
                }}>
                Don't have an account? <Link to={ signUp }>Sign Up</Link> 
            </Typography>
        </>
    )
}

export default LogIn
