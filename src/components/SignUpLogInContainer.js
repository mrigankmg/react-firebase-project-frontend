import React from 'react'
import { 
    Container,
    Box
} from '@mui/material';
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useLocation } from 'react-router-dom'
import { signUp } from '../constants/routes'

const SignUpLogInContainer = () => {
    const location = useLocation();

    return (
        <Container
            sx={{ 
                display: "flex",
                alignItems:"center",
                justifyContent: "center",
                minHeight: "100vh"
            }}>
            <Box
                sx={{ 
                    marginBlock: '40px',
                    width: '100%',
                    maxWidth: '500px'
                }}>
                    { location.pathname === signUp ? <SignUp /> : <LogIn /> }
            </Box>
        </Container>
    )
}

export default SignUpLogInContainer
