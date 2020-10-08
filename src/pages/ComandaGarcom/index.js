import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Picker } from '@react-native-community/picker'
import { useAuth } from '../../contexts/auth';
import reservationService from '../../services/reservationService';

const ComandaGarcom = ({navigation, route: { params }}) => {

    const { user } = useAuth()
    const [qtdPessoas, setQtdPessoas] = useState(1);
    const [mesasDisponiveis, setMesasDisponiveis] = useState([]);
    const [comanda, setComanda] = useState(null);
    const [mesa, setMesa] = useState(null);

    const getRestaurantTables = async() => {
        const response = await reservationService.checkAvailability(user.idRestaurante, new Date().toISOString(), qtdPessoas)
        if (response && response.mesasDisponiveis) {
            setMesasDisponiveis(response.mesasDisponiveis)
            const idMesa = response.mesasDisponiveis && response.mesasDisponiveis.length > 0 ? response.mesasDisponiveis[0].idMesa : null
            setMesa(idMesa)
        }
    }

    useEffect(() => {
        setComanda(null)
        setMesa(null)
        getRestaurantTables()
    }, [qtdPessoas])

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

    const makeReservation = async() => {
        if (mesa && qtdPessoas) {
            const idMesa = mesa
            const reserva = await reservationService.makeReservation(user.idRestaurante, user.idUsuario, idMesa, new Date().toISOString())
            if (reserva) {
                setComanda(reserva.idComanda)
            }
        }
    } 

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Criar comanda</Text>
            <View style={styles.section}>
                <Text style={{margin: 25, fontSize: 15, fontWeight:'bold'}}>
                    Reservar uma mesa para agora:
                </Text>
                <View style={styles.row}>
                    <Text style={styles.text3}>Quantidade de pessoas</Text>
                    <View style={styles.btnBox}>
                        <TouchableOpacity
                            onPress={decrease}>
                            <Icon name="remove-circle" style={styles.qtdButton} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, marginTop: 30}}>{qtdPessoas}</Text>
                        <TouchableOpacity
                            onPress={increase}>
                            <Icon name="add-circle" style={styles.qtdButton} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style={{ margin: 25, fontSize: 15, fontWeight: 'bold' }}>
                        Escolha a mesa que desejar:
                    </Text>
                    {
                        mesasDisponiveis && mesasDisponiveis.length > 0 
                        ?   <Picker
                                selectedValue={mesa}
                                style={{ marginLeft: 20, marginRight: 15 }}
                                onValueChange={itemValue => setMesa(itemValue)}>
                                {
                                    mesasDisponiveis.map((item, idx) => 
                                        <Picker.Item key={idx} label={item.nomeMesa} value={item.idMesa} />
                                    )
                                }
                            </Picker>
                        :   <Text style={{ margin: 25, fontSize: 14, textAlign: 'center' }}>
                                Não há mesas disponíveis no momento.
                            </Text>
                    }
                </View>
                
                {
                    comanda && mesa ?
                    <View style={{ marginBottom: 30}}>
                        <Text style={styles.text2}>Comanda criada: {comanda}</Text>
                    </View> : null
                }
            </View>

            <View style={styles.actionBtnBox}>
                <TouchableOpacity style={styles.buttonFinaliza} onPress={() => makeReservation()}>
                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontWeight: "bold"}}>Gerar comanda</Text>
                </TouchableOpacity>
            </View>      
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: "column",
        marginVertical: 30,
    },
    text: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 30,
    },
    text2: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
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
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5
    },
    text4: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
    },
    qtdButton: {
        marginTop: 25,
        fontSize: 40,
        color: '#ffc127',
        marginHorizontal: 10,
    },
    btnBox: {
        flexDirection: "row",
        marginTop: 10
    },
    section: { backgroundColor: '#fff', padding: 10, borderRadius: 15, margin: 25 },
    actionBtnBox: {
        marginVertical: 30
    }
});

export default ComandaGarcom