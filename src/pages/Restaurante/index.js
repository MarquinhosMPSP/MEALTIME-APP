import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView, Image, StyleSheet, TextInput, Button, View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import reservationService from '../../services/reservationService';
import { useAuth } from '../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';

const Restaurante = ({ route, navigation }) => {
    const { user } = useAuth()
    const { restaurante } = route.params

    const [date, setDate] = useState(new Date());
    const [qtdPessoas, setQtdPessoas] = useState(1);

    const makeReservation = async(idMesa) => {
        const result = await reservationService.makeReservation(restaurante.idRestaurante, user.idUsuario, idMesa, new Date(date).toISOString())
        if (result && result.idComanda) {
            AsyncStorage.setItem('idComanda', result.idComanda)
        }
    }

    const checkAvailability = async() => {
        const result = await reservationService.checkAvailability(restaurante.idRestaurante, new Date(date).toISOString(), qtdPessoas)

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
            return
        }
        Alert.alert(
            "Sem mesas disponíveis",
            `O restaurante está lotado para essa data e horário, tente novamente!`,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
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
        setDate(currentDate);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} pagingEnabled={true}>
                <View>
                    <ImageBackground source={require('./../../assets/img/rest.jpg')} style={styles.imagem}>
                        <Text style={styles.textTitle}> {restaurante.nomeRestaurante} </Text>
                        <Text style={styles.text}> {restaurante.descricao}</Text>
                    </ImageBackground>
                </View>
                {/* <View>
                    <Text style={styles.text2}> Prato do dia</Text>
                </View>
                <View>   
                    <ImageBackground source={require('./../../assets/img/bigmac.jpg')} style={styles.lanche}>
                        <Text style={{alignSelf: 'center', color: '#fff', fontSize: 22, marginTop: 50}}>

                        </Text>
                    </ImageBackground>
                </View> */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text2}>Reserve sua mesa</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text3}>Quantidade de pessoas</Text>
                    <View style={styles.btnBox}>
                        <TouchableOpacity
                            onPress={decrease}>
                            <Icon name="remove-circle" style={styles.incDecBtn} />
                        </TouchableOpacity>
                        <Text style={styles.text4}>{qtdPessoas}</Text>
                        <TouchableOpacity
                            onPress={increase}>
                            <Icon name="add-circle" style={styles.incDecBtn} />
                        </TouchableOpacity>
                    </View>
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
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.text3}>Data e hora da reserva</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='datetime'
                        is24Hour={true}
                        display="default"
                        locale="pt-BR"
                        onChange={onChange} />
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
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.text3}>Observações</Text>
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize="none"
                        multiline={true}
                        numberOfLines={5}
                        placeholder='Escreva aqui sua observação...'
                        style={styles.areaText} />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Button style={styles.button}
                        onPress={checkAvailability}
                        title="Reservar mesa"
                        color="#ffc127" />
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
        marginLeft: 10,
        fontSize: 30,
        color: '#fff',
        marginTop: 30,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: -1, height: 3 },
        textShadowRadius: 10
    },
    text: {
        marginLeft: 15,
        fontSize: 15,
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    text2: {
        color: '#524D4C',
        marginLeft: 18,
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    },
    text3: {
        color: '#524D4C',
        marginLeft: 18,
        fontSize: 14,
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
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ffc127',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    areaText: {
        marginHorizontal: 25,
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginEnd: 20
    },
    btnBox: {
        flexDirection: "row",
        marginTop: 10
    },
    incDecBtn: {
        fontSize: 25,
        color: '#ffc127',
        marginHorizontal: 10
    },
    text4: {
        fontSize: 20
    }
});

export default Restaurante