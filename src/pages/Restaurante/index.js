import React from 'react'
import { SafeAreaView, Image, StyleSheet, TextInput, Button, View, Text, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


const Restaurante = () => {

    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} pagingEnabled={true}>
                <View>
                    <ImageBackground source={require('./../../assets/img/mcdonalds.jpg')} style={styles.imagem}>
                        <Text style={styles.textTitle}> McDonald's</Text>
                        <Text style={styles.text}> Meu pau pequeno</Text>
                    </ImageBackground>
                </View>
                <View>
                    <Text style={styles.text2}> Prato do dia</Text>
                </View>
                <View>   
                    <ImageBackground source={require('./../../assets/img/bigmac.jpg')} style={styles.lanche}>
                        <Text style={{alignSelf: 'center', color: '#fff', fontSize: 22, marginTop: 50}}> Big Mac + Batata + Meu pau</Text>
                    </ImageBackground>
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={styles.text2}> Reserve sua mesa</Text>
                </View>      
            </ScrollView>  
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    logo: {
        width: "70%",
        resizeMode: "contain",
        height: 40,
        alignSelf: 'center',
        marginTop: 15
    },
    textTitle:{
        marginLeft: 10,
        fontSize: 30,
        color: '#000',
        marginTop: 30,
        fontWeight: 'bold'  
    },
    text:{
        marginLeft: 15,
        fontSize: 15,
        color: '#000',
        marginTop: 10
    },
    text2:{
        color: '#524D4C',
        marginLeft: 18,
        fontSize: 17,
        marginTop: 10,
        fontWeight: 'bold'
    },
    imagem: {
        resizeMode: "contain",
        height: 150
    },

    lanche: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        resizeMode: 'contain',
        height: 140,
        borderRadius: 25 / 2,
        overflow: "hidden",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 7,
    },
});

export default Restaurante