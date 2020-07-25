import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/MaterialIcons'

import Home from '../pages/Home'
import Restaurante from '../pages/Restaurante'
import { useAuth } from '../contexts/auth';

const AppStack = createStackNavigator()

const navigationOptions = () => {
    const { logout } = useAuth()
    return {
        headerTitle: () => <Image source={require("./../assets/img/logo-black.png")} 
                    style={{ width: 160, resizeMode: 'contain', alignSelf: 'center' }} />,
        headerRight: () => <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => logout()} >
                                <Icon name="exit-to-app" style={{ fontSize: 25, color: '#666' }}  />
                            </TouchableOpacity>
    }
}

const AppRoutes = () => (
    <AppStack.Navigator screenOptions={navigationOptions}>
        <AppStack.Screen name="Home" component={Home}/>
        <AppStack.Screen name="Restaurante" component={Restaurante}/>
    </AppStack.Navigator>
)

export default AppRoutes