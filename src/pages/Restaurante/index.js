import React from 'react'
import { SafeAreaView, Image, StyleSheet, TextInput, Button, View, Text, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


const Restaurante = () => {

    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} pagingEnabled={true}>
                <View>
                    <ImageBackground source={require('./../../assets/img/mcdonalds.jpg')} style={styles.image}>
                        <Text style={styles.textTitle}> McDonald's</Text>
                        <Text> Meu pau pequeno</Text>
                    </ImageBackground>
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

export default Restaurante