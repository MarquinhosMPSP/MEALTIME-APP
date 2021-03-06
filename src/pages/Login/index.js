import React, { useState } from 'react'
import { View, ImageBackground, Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native'
import { useAuth } from '../../contexts/auth'

const Login = ({navigation}) => {

    const { signed, user, login } = useAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const requestLogin = async () => {
        if (username && password) {
            const response = await login(username, password)
            if (response) {
                Alert.alert(
                    "Falha ao autenticar",
                    response.message,
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
            }
        }
    }

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
                        placeholder="Digite seu email"
                        onChangeText={setUsername} />
                    <TextInput
                        style={styles.inputText2}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Digite sua senha"
                        onChangeText={setPassword} />
                    <Button 
                        buttonStyle={styles.button}
                        title="Fazer login"
                        disabled={!username || !password}
                        color="#ffc127"
                        onPress={requestLogin} />
                    <View style={{marginBottom: 15}}></View> 
                    <Button
                        buttonStyle={styles.button}
                        title="Cadastre-se"
                        color="#ffc127"
                        onPress={() => navigation.navigate('CadastroUser')} /> 
     
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
    inputText2: {
        height: 40,
        width: '70%',
        marginTop: 15,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderColor: 'gray',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#fff',
        color: 'gray'
    },
    button: {
        marginRight:30,
        marginLeft:30,
        marginTop:10,
        backgroundColor:'#ffc127',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        
    }
});

export default Login