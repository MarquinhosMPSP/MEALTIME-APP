import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/MaterialIcons'

import Home from '../pages/Home'
import Restaurante from '../pages/Restaurante'
import { useAuth } from '../contexts/auth';
import Cardapio from '../pages/Cardapio';
import ListaPedidos from '../pages/ListaPedidos';
import ListaReservas from '../pages/ListaReservas';

const AppStack = createStackNavigator()

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
        </TouchableOpacity>
    }
}

const restaurantNavigationOptions = ({ navigation, params }) => {
    return {
        headerRight: () => 
        <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => navigation.navigate('ListaReservas', params)} >
            <Icon name="bluetooth" style={{ fontSize: 25, color: '#666' }} />
        </TouchableOpacity>
    
    }
}

const AppRoutes = () => (
    <AppStack.Navigator screenOptions={{ ...navigationOptions }}>
        <AppStack.Screen name="Home" component={Home} options={homeNavigationOptions} />
        <AppStack.Screen name="Restaurante" component={Restaurante} options={restaurantNavigationOptions}/>
        <AppStack.Screen name="Cardapio" component={Cardapio} />
        <AppStack.Screen name="ListaPedidos" component={ListaPedidos}  />
        <AppStack.Screen name="ListaReservas" component={ListaReservas}  />
    </AppStack.Navigator>
)

export default AppRoutes