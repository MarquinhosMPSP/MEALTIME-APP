import React, { useState } from 'react'
import { View, SafeAreaView, ImageBackground, Image, StyleSheet, TextInput, Button } from 'react-native'

import logo from '../assets/img/logo.png'
import barra from '../assets/img/barra.png'
import menu from '../assets/img/menu.png'
import book from '../assets/img/book.png'

const Home = () => {


    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.barra} source={barra}>
                <Image style={styles.logo} source={logo} />
                <Image style={styles.menu} source={menu} />
                <Image style={styles.book} source={book} />
                
            </View>
            <TextInput
                    style={styles.inputText}
                    placeholder="Encontre um restaurante..." />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#000'
    },
    barra: {
        flex: 1,
        height: 70,
        justifyContent: 'center'
    },
    menu: {
        height: 25,
        resizeMode: 'contain',
        width: 50,
        marginTop: 15,
        padding: 10,
    },
    book: {
        height: 25,
        resizeMode: 'contain',
        width: 50,
        marginTop: 15,
        padding: 10,
    },
    logo: {
        width: "70%",
        resizeMode: "contain",
        height: 40,
        alignSelf: 'center',
        marginTop: 15
    },
    inputText: {
        height: 40,
        width: '85%',
        marginTop: 15,
        paddingHorizontal: 15,
        borderColor: 'gray',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#fff',
        color: 'gray',
        alignSelf: 'center' 
    },
});

export default Home