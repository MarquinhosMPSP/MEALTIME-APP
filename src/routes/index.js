import React from 'react'

import { useAuth } from '../contexts/auth'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'
import GarcomRoutes from './garcom.routes'

const Routes = () => {
    const { signed, garcom } = useAuth()

    if (signed) {
        return garcom ? <GarcomRoutes /> : <AppRoutes /> 
    }

    return <AuthRoutes />
}

export default Routes