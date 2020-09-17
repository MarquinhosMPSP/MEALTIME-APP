import React, { useState } from 'react'
import { View, ImageBackground, Image, StyleSheet, TextInput, Button, Alert } from 'react-native'

const CadastroUser = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('./../../assets/img/restaurant.jpg')}
                style={styles.image}>
                    <Image 
                        source={require("./../../assets/img/logo.png")}
                        style={styles.logo} />
                    <TextInput
                        style={styles.inputText}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite o seu nome"
                        />
                    <TextInput
                        style={styles.inputText}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Digite uma senha"
                        />
                    <TextInput
                        style={styles.inputText}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Digite o seu login"
                        />
                    <Button 
                        buttonStyle={styles.button}
                        title="Cadastrar"
                        color="#ffc127"
                        onPress={() => alert("Recebido") } 
                        />    
                    <Button 
                        buttonStyle={styles.button}
                        title="Fazer login"
                        color="#ffc127"
                        onPress={() => navigation.navigate('Login')} />
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: "70%",
        resizeMode: "contain"
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
    },
    inputText: {
        height: 40,
        width: '70%',
        marginTop: 15,
        paddingHorizontal: 15,
        borderColor: 'gray',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#fff',
        color: 'gray'
    },
    button: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#ffc127',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    }
});

export default CadastroUser