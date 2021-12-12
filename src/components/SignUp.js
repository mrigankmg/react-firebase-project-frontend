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
import { logIn } from '../constants/routes'

const SignUp = () => {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const reEnteredPasswordRef = useRef()
    const { signUp, error, setError } = useAuth()

    const handleSignUp = e => {
        e.preventDefault()
        const password = passwordRef.current.value
        const reEnteredPassword = reEnteredPasswordRef.current.value
        if (password === reEnteredPassword) {
            const name = nameRef.current.value
            const email = emailRef.current.value
            signUp(name, email, password)
        } else {
            setError("Passwords don't match.")
        }
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography
                        variant="h3"
                        sx={{ textAlign: 'center' }}>
                        Sign Up
                    </Typography>
                    { error && 
                        <Alert 
                            severity="error"
                            sx={{ marginTop: '20px' }}>
                            { error }
                        </Alert> 
                    }
                    <form onSubmit={ handleSignUp }>
                        <FormGroup 
                            id="first-name"
                            sx={{ marginTop: '20px' }}>
                            <FormLabel>
                                First Name
                            </FormLabel>
                            <TextField
                                sx={{ marginTop: '10px' }}
                                inputRef={ nameRef }
                                variant="standard"
                                required />
                        </FormGroup>
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
                        <FormGroup 
                            id="re-entered-password"
                            sx={{ marginTop: '20px' }}>
                            <FormLabel>
                                Confirm Password
                            </FormLabel>
                            <TextField
                                type="password"
                                sx={{ marginTop: '10px' }}
                                inputRef={ reEnteredPasswordRef }
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
                            Sign Up
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
                Already have an account? <Link to={ logIn }>Log In</Link> 
            </Typography>
        </>
    )
}

export default SignUp
