import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { lobby } from '../constants/routes'

const NonPrivateRoute = () => {
    const { currentUser } = useAuth()

    return (
        currentUser ? <Navigate to={ lobby } /> : <Outlet />
    )
}

export default NonPrivateRoute
