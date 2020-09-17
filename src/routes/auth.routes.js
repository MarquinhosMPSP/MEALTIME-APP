import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";

import Login from '../pages/Login'
import CadastroUser from '../pages/CadastroUser'

const AuthStack = createStackNavigator()

const AuthRoutes = () => (
    <AuthStack.Navigator 
    headerMode={"none"}>
        <AuthStack.Screen name="Login" component={Login}/>
        <AuthStack.Screen name="CadastroUser" component={CadastroUser}/>
    </AuthStack.Navigator>
)

export default AuthRoutes