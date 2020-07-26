import React from 'react'
import { SafeAreaView, Image, StyleSheet, TextInput, Button, View, Text, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


const Restaurante = ( { route, navigation}) => {

    const { restaurante } = route.params
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} pagingEnabled={true}>
                <View>
                    <ImageBackground source={require('./../../assets/img/rest.jpg')} style={styles.imagem}>
                        <Text style={styles.textTitle}> {restaurante.nomeRestaurante} </Text>
                        <Text style={styles.text}> {restaurante.descricao}</Text>
                    </ImageBackground>
                </View>
                <View>
                    <Text style={styles.text2}> Prato do dia</Text>
                </View>
                <View>   
                    <ImageBackground source={require('./../../assets/img/bigmac.jpg')} style={styles.lanche}>
                        <Text style={{alignSelf: 'center', color: '#fff', fontSize: 22, marginTop: 50}}>

                        </Text>
                    </ImageBackground>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={styles.text2}> Reserve sua mesa</Text>
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={styles.text3}> Quantidade de pessoas</Text>
                </View>
                <View
                    style={{
                        marginTop: 25,
                        borderBottomColor: '#C9C9C9',
                        borderBottomWidth: 1,
                        marginLeft: 20,
                        marginRight: 20
                    }}
                />
                <View style={{marginTop: 5}}>
                    <Text style={styles.text3}> Horário da reserva</Text>
                </View>
                <View
                    style={{
                        marginTop: 25,
                        borderBottomColor: '#C9C9C9',
                        borderBottomWidth: 1,
                        marginLeft: 20,
                        marginRight: 20
                    }}
                />
                 <View style={{marginTop: 5}}>
                    <Text style={styles.text3}> Observações</Text>
                    <TextInput style={{marginTop: 5, marginLeft: 40, fontSize: 11}}> Escreva aqui sua observação...</TextInput>
                </View>
                <View style={{marginTop: 15}}>
                <Button style={styles.button} 
                        title="Reservar mesa"
                        color="#ffc127"
                        />  
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
        color: '#fff',
        marginTop: 30,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: {width: -1, height: 3},
        textShadowRadius: 10
    },
    text:{
        marginLeft: 15,
        fontSize: 15,
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    text2:{
        color: '#524D4C',
        marginLeft: 18,
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold'
    },
    text3: {
        color: '#524D4C',
        marginLeft: 18,
        fontSize: 13,
        marginTop: 15,
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
    button: {
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#ffc127',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
});

export default Restaurante