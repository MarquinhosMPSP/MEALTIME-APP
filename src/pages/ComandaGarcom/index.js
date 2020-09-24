import React, { useState } from 'react'
import { View, ImageBackground, Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ComandaGarcom = ({navigation}) => {

    const [qtdPessoas, setQtdPessoas] = useState(1);

    const increase = () => {
        setQtdPessoas((prevState) => {
            if (prevState < 20) return prevState + 1
            return prevState
        })
    }

    const decrease = () => {
        setQtdPessoas((prevState) => {
            if (prevState > 1) return prevState - 1
            return prevState
        })
    }

    return (
        <View style={styles.container}>
            
            <Text style={styles.text}> Criar comanda</Text>
            <View>
                <Text style={{marginLeft: 25, marginTop: 85, fontSize: 15, color: '#524D4C', fontWeight:'bold'}}>Reservar uma mesa para agora: </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.text3}>Quantidade de pessoas</Text>
                <View style={styles.btnBox}>
                    <TouchableOpacity
                        onPress={decrease}>
                        <Icon name="remove-circle" style={styles.incDecBtn} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, marginTop: 25}}>{qtdPessoas}</Text>
                    <TouchableOpacity
                        onPress={increase}>
                        <Icon name="add-circle" style={styles.incDecBtn} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <Text style={styles.text2}> A comanda criada: 1</Text>
            <Text style={styles.text4}> Mesa reservada: 2</Text>
                
            <View>
                <TouchableOpacity style={styles.buttonFinaliza}>
                    <Text style={{ alignSelf: 'center', color: 'white' ,  fontSize: 15, fontWeight: "bold"}}>Gerar comanda</Text>
                </TouchableOpacity>
            </View>      
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    text: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 60,
    },
    text2: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        color:'#524D4C',
        marginTop: 60,
    },
    buttonFinaliza: {
        marginTop: 75,
        marginLeft: 25,
        marginRight: 25,
        padding: 6,
        backgroundColor: '#ffc127',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    text3: {
        marginTop: 25,
        color: '#524D4C',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5
    },
    text4: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        color:'#524D4C'
    },
    incDecBtn: {
        marginTop: 25,
        fontSize: 30,
        color: '#ffc127',
        marginHorizontal: 10,
    },
    btnBox: {
        flexDirection: "row",
        marginTop: 10
    },
});

export default ComandaGarcom