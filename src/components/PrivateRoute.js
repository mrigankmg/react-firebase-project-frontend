import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { logIn } from '../constants/routes'

const PrivateRoute = () => {
    const { currentUser } = useAuth()

    return (
        currentUser ? <Outlet /> : <Navigate to={ logIn } />
    )
}

export default PrivateRoute
