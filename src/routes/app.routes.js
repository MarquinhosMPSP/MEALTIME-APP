import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../pages/Home'

const AppStack = createStackNavigator()

const LogoTitle = () => (
    <Image 
        source={require("./../assets/img/logo-black.png")} 
        style={{ width: 160, resizeMode: 'contain', alignSelf: 'center' }} />
)

const headerTitle = props => <LogoTitle {...props} />

const AppRoutes = () => (
    <AppStack.Navigator screenOptions={{ headerTitle }}>
        <AppStack.Screen name="Home" component={Home}/>
    </AppStack.Navigator>
)

export default AppRoutes