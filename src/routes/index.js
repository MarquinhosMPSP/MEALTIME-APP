import React from 'react'

import { useAuth } from '../contexts/auth'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'
import GarcomRoutes from './garcom.routes'

const Routes = () => {
    const { signed, loading, garcom } = useAuth()

    //if (loading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color="#999" />
    //         </View>
    //     )
    // }

    if (signed) {
        return garcom ? <GarcomRoutes /> : <AppRoutes /> 
    }

    return <AuthRoutes />
}

export default Routes