import React, { useState } from 'react'
import { View, ImageBackground, Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const HomeGarcom = ({navigation}) => {

    return (
        <View style={styles.container}>
            
            <Text style={styles.text}> Aeee corneta</Text>

            <TouchableOpacity style={{...styles.button, marginTop: 130}} onPress={() => navigation.navigate('ComandaGarcom')}>
                <View style={{justifyContent: "space-between", alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{width: '30%'}}>    
                        <Icon name="event-note" style={{ fontSize:22, color:'black', alignSelf: 'center' }} />
                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Nova comanda</Text>
                    </View>      
                </View>         
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, marginTop: 50}} onPress={() => navigation.navigate('PedidoGarcom')}>
                <View style={{justifyContent: "space-between", alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{width: '30%'}}>    
                        <Icon name="local-mall" style={{ fontSize:22, color:'black', alignSelf: 'center' }} />
                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Novo pedido</Text>
                    </View>      
                </View>         
            </TouchableOpacity>  
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    button: {
        padding: 29,
        borderRadius: 10,
        marginHorizontal: 80,
        backgroundColor: '#ffc127',
    },
    text: {
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 60
    }
});

export default HomeGarcom