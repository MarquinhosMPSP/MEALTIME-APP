import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useAuth } from '../contexts/auth';

import HomeGarcom from '../pages/HomeGarcom'
import ComandaGarcom from '../pages/ComandaGarcom'
import PedidoGarcom from '../pages/PedidoGarcom'

const AuthStack = createStackNavigator()

const navigationOptions = {
    headerTitle: () => <Image source={require("./../assets/img/logo-black.png")}
        style={{ width: 160, resizeMode: 'contain', alignSelf: 'center' }} />
}

const homeNavigationOptions = () => {
    const { logout } = useAuth()
    return {
        headerRight: () => 
        <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => logout()} >
            <Icon name="exit-to-app" style={{ fontSize: 25, color: '#666' }} />
        </TouchableOpacity>,
        title: 'Home'
    }
}

const GarcomRoutes = () => (
    <AuthStack.Navigator 
    screenOptions={{ ...navigationOptions}}>
        <AuthStack.Screen name="HomeGarcom" component={HomeGarcom} options={homeNavigationOptions} />
        <AuthStack.Screen name="PedidoGarcom" component={PedidoGarcom} options={{ title: 'Pedido' }}/>
        <AuthStack.Screen name="ComandaGarcom" component={ComandaGarcom} options={{ title: 'Comanda' }}/>
    </AuthStack.Navigator>
)

export default GarcomRoutes