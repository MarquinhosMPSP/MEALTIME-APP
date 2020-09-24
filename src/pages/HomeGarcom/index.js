import React, { useState } from 'react'
import { View, ImageBackground, Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const HomeGarcom = ({navigation}) => {

    return (
        <View style={styles.container}>
            
            <Text style={styles.text}> Aeee corneta</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ComandaGarcom')}>
                <View style={{flex: 1, justifyContent: "space-between", alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{width: '30%'}}>    
                        <Icon name="clipboard" style={{ fontSize:22, color:'black', alignSelf: 'center' }} />
                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Nova comanda</Text>
                    </View>      
                </View>         
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('PedidoGarcom')}>
                <View style={{flex: 1, justifyContent: "space-between", alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{width: '30%'}}>    
                        <Icon name="coffee" style={{ fontSize:22, color:'black', alignSelf: 'center' }} />
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
        marginLeft: 80,
        marginRight: 80,
        marginTop: 130,
        padding: 29,
        backgroundColor: '#ffc127',
        borderRadius: 10,
    },
    button2: {
        marginLeft: 80,
        marginRight: 80,
        marginTop: 50,
        padding: 29,
        backgroundColor: '#ffc127',
        borderRadius: 10,
    },
    text: {
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 60
    }
});

export default HomeGarcom