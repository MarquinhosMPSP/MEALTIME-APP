import React from 'react'
import { SafeAreaView, Image, StyleSheet, TextInput, Button, View, Text } from 'react-native'
import { useAuth } from '../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';


const Home = () => {

    const { logout } = useAuth()

    return (
        <SafeAreaView style={styles.container}>
            
            <ScrollView style={styles.scrollView} pagingEnabled={true}>
                <TextInput style={styles.inputText} placeholder="Encontre um restaurante..." />
                <Button title="logout" onPress={() => logout()} />

                <View style={styles.container}>
                    <Text style={styles.textTitle}>Visitados recentemente</Text>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Visitados recentemente</Text>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Visitados recentemente</Text>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Visitados recentemente</Text>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Visitados recentemente</Text>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Visitados recentemente</Text>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                    <Image style={styles.imagem} source={require("./../../assets/img/logo-black.png")}/>
                </View>
            </ScrollView>  
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 10,
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
        alignSelf: 'center',
        marginBottom: 15, 
    },
    textTitle:{
        marginLeft: 10,
        fontSize: 20
    },
    scrollView: {
        marginHorizontal: 20,
    },
    imagem: {
        width: "70%",
        resizeMode: "contain"
    }
});

export default Home