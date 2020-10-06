import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from "@react-native-community/async-storage";

import websocketService from '../services/websocketService'

import api from '../services/api';
import authService from '../services/authService'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [garcom, setGarcom] = useState(false)
    const [loading, setLoading] = useState(true)

    async function loadStoragedData() {
        const [[,storagedUser], [,storagedToken]] = await AsyncStorage.multiGet(['user', 'token'])

        if (storagedUser && storagedToken) {
            api.defaults.headers['x-access-token'] = storagedToken
            setUser(JSON.parse(storagedUser))
            setLoading(false)
        }
    }

    useEffect(() => {
        loadStoragedData()
    }, [])

    async function login(username, password) {
        const response = await authService.login(username, password)

        if (response && response.data && response.status === 200) {
            const { usuario, token } = response.data

            setUser(usuario)

            if (usuario && usuario.idPerfil === 3) {
                setGarcom(true)
            }

            if (usuario && token) {
                api.defaults.headers['x-access-token'] = token
    
                await AsyncStorage.setItem('user', JSON.stringify(usuario))
                await AsyncStorage.setItem('token', token)
            }
            return null
        }
        return response.data
    }

    function logout() {
        AsyncStorage.clear().then(() => setUser(null))
        setGarcom(false)
        websocketService.disconnect()
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, garcom, loading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}