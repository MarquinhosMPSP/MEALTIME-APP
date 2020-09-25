import React, { useState } from 'react'
import { View, ImageBackground, Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useAuth } from '../../contexts/auth';
import reservationService from '../../services/reservationService';

const ComandaGarcom = ({navigation, route: { params }}) => {

    const { user } = useAuth()
    const [qtdPessoas, setQtdPessoas] = useState(1);
    const [comanda, setComanda] = useState(null);
    const [mesa, setMesa] = useState(null);

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

    const checkAvailability = async() => {
        const mesas = await reservationService.checkAvailability(user.idRestaurante, new Date().toISOString(), qtdPessoas)
        if (mesas.mesasDisponiveis && mesas.mesasDisponiveis.length > 0) {
            const idMesa = mesas.mesasDisponiveis[0].idMesa
            const reserva = await reservationService.makeReservation(user.idRestaurante, user.idUsuario, idMesa, new Date().toISOString())
            if (reserva) {
                setComanda(reserva.idComanda)
                setMesa(reserva.nomeMesa)
            }
        }
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
            
            {
                comanda && mesa ?
                <>
                    <Text style={styles.text2}> A comanda criada: {comanda}</Text>
                    <Text style={styles.text4}> Mesa reservada: {mesa}</Text>
                </> : null
            }
                
            <View>
                <TouchableOpacity style={styles.buttonFinaliza} onPress={() => checkAvailability()}>
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
        marginTop: 100,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 80,
        backgroundColor: '#ffc127',
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