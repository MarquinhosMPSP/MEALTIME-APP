import React, { useState } from 'react'
import { View, ImageBackground, Image, StyleSheet, TextInput, Button, Alert } from 'react-native'
import cadastroService from '../../services/cadastroService'

const CadastroUser = ({navigation}) => {

    const [nome, setNome] = useState([])
    const [login, setLogin] = useState([])
    const [senha, setSenha] = useState([])

    const signUp = async() => {
        const result = await cadastroService.signUp(nome, login, senha)
        if (result && result.status === 201) {
            Alert.alert(
                'Usuário cadastrado',
                `Usuário ${nome} cadastrado com sucesso!`,
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                'Falha ao cadastrar',
                `Não foi possível cadastrar o usuário, verifique os dados inseridos.`,
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
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
                        placeholder="Digite o seu nome"
                        onChangeText={nome => setNome(nome)}
                        />
                    <TextInput
                        style={styles.inputText}
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Digite uma senha"
                        onChangeText={senha => setSenha(senha)}
                        />
                    <TextInput
                        style={styles.inputText2}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite o seu login"
                        onChangeText={login => setLogin(login)}
                        />
                    <Button 
                        buttonStyle={styles.button}
                        title="Cadastrar"
                        disabled={!login || !nome || !senha}
                        color="#ffc127"
                        onPress={() => signUp()} 
                        />
                    <View style={{marginBottom: 15}}></View>        
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