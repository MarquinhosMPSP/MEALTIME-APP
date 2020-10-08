import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useAuth } from '../../contexts/auth';
import reservationService from '../../services/reservationService';
import websocketService from '../../services/websocketService'

const Restaurante = ({ route, navigation }) => {
   
    const interval = useRef(null)
    const dateRef = useRef(new Date())

    const { user } = useAuth()
    const { restaurante } = route.params

    const [date, setDate] = useState(new Date());
    const [qtdPessoas, setQtdPessoas] = useState(1);

    const atualizarReserva = () => {
        websocketService.from('atualizou reserva').subscribe(data => {
            const reserva = data && data.length > 0 ? data[0] : null
            if (reserva && reserva.status === 'aceita') {
                Alert.alert(
                    "Reserva aceita",
                    `O restaurante confirmou sua reserva, o número da sua comanda é ${reserva.idComanda}`,
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
            }
            if (reserva && reserva.status && reserva.status !== 'aceita') {
                Alert.alert(
                    `Reserva ${reserva.status}`,
                    `Sua reserva foi ${reserva.status}!`,
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
            }
        })
    }

    const validateTime = () => 
        dateRef.current 
        && (dateRef.current < new Date()) 
        && (dateRef.current.getMinutes() < new Date().getMinutes())

    const updateDateAutomatically = () => {
        interval.current = setInterval(() => {
            if (validateTime()) {
                dateRef.current = new Date()
                setDate(new Date())
            }
        }, 1000)
    }

    useEffect(() => {
        clearInterval(interval.current)
        updateDateAutomatically()
    }, [date])
    
    useEffect(() => {
        atualizarReserva()
        return function cleanup() {
            clearInterval(interval.current)
            websocketService.unsubscribe('atualizou reserva')
        };
    }, [])


    const makeReservation = async(idMesa) => {
        const result = await reservationService.makeReservation(restaurante.idRestaurante, user.idUsuario, idMesa, new Date(date).toISOString())
        if (result) {
            Alert.alert(
                "Reserva requisitada",
                `Aguarde o restaurante ${restaurante.nomeRestaurante} confirmar sua reserva.`,
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
    }

    const checkAvailability = async () => {

        const result = await reservationService.checkAvailability(restaurante.idRestaurante, new Date(date).toISOString(), qtdPessoas)

        if (result && result.status === 500) {
            Alert.alert(
                "Data inválida!",
                `${result.data && result.data.message ? result.data.message : 'Por favor, selecione uma data válida'}`,
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }

        if (result.mesasDisponiveis && result.mesasDisponiveis.length > 0) {
            Alert.alert(
                "Mesas disponíveis",
                `O restaurante possui mesa disponível, deseja reservar?`,
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    { text: "Reservar", onPress: () => makeReservation(result.mesasDisponiveis[0].idMesa) }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Sem mesas disponíveis",
                `O restaurante está lotado para essa data e horário, tente novamente!`,
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }
    }

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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate)
    };

    const goToFoodMenu = () => navigation.navigate('Cardapio', { idRestaurante: restaurante.idRestaurante, nomeRestaurante: restaurante.nomeRestaurante, view: true })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} pagingEnabled={true}>
                <ImageBackground source={require('./../../assets/img/rest.jpg')} style={styles.imagem}>
                    <Text style={styles.textTitle}> {restaurante.nomeRestaurante} </Text>
                    <Text style={styles.text}> {restaurante.descricao}</Text>
                </ImageBackground>
                <View style={{ margin: 20 }}>
                    <Text style={styles.text2}>Reserve sua mesa</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text3}>Quantidade de pessoas</Text>
                    <View style={styles.btnBox}>
                        <TouchableOpacity
                            onPress={decrease}>
                            <Icon name="remove-circle" style={styles.qtdButton} />
                        </TouchableOpacity>
                        <Text style={styles.text4}>{qtdPessoas}</Text>
                        <TouchableOpacity
                            onPress={increase}>
                            <Icon name="add-circle" style={styles.qtdButton} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: '#C9C9C9',
                        borderBottomWidth: 1,
                        margin: 20,
                    }}
                />
                <View style={{ marginTop: 5, marginHorizontal: 20 }}>
                    <Text style={styles.text3}>Data e hora da reserva</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='datetime'
                        is24Hour={true}
                        minimumDate={new Date()}
                        display="default"
                        locale="pt-BR"
                        onChange={onChange} />
                </View>
                <View
                    style={{
                        margin: 20,
                        borderBottomColor: '#C9C9C9',
                        borderBottomWidth: 1,
                    }}
                />
                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity style={styles.buttonCardapio} onPress={goToFoodMenu}>
                        <Text style={{ alignSelf: 'center', color: 'white' ,  fontSize: 20}}>Ver cardápio</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity style={styles.buttonFinaliza} onPress={checkAvailability}>
                        <Text style={{ alignSelf: 'center', color: 'white' ,  fontSize: 20}}>Reservar mesa</Text>
                    </TouchableOpacity>
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
    textTitle: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: -1, height: 3 },
        textShadowRadius: 10
    },
    text: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    text2: {
        color: '#524D4C',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text3: {
        color: '#524D4C',
        fontSize: 14,
        fontWeight: 'bold'
    },
    text4: {
        fontSize: 20, 
        marginTop: 5
    },
    imagemContainer: {
        backgroundColor: '#000'
    },
    imagem: {
        resizeMode: "contain",
        height: 150,
        padding: 20
    },
    lanche: {
        marginTop: 10,
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
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ffc127',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    areaText: {
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    btnBox: {
        flexDirection: "row",
        marginTop: 10
    },
    qtdButton: {
        fontSize: 40,
        color: '#ffc127',
        marginHorizontal: 10,
    },
    buttonFinaliza: {
        marginLeft: 25,
        marginRight: 25,
        padding: 10,
        backgroundColor: '#ffc127',
        borderRadius: 15,
    },
    buttonCardapio: {
        marginLeft: 25,
        marginRight: 25,
        padding: 10,
        backgroundColor: '#868686',
        borderRadius: 15,
    },
});

export default Restaurante