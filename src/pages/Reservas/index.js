import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, Image, TextInput, ScrollView, Button } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Dimensions } from "react-native";
import { DateTime } from 'luxon'

import reservationService from '../../services/reservationService'
import { useAuth } from "../../contexts/auth";
import { capitalize } from "../../utils";

var width = Dimensions.get('window').width; //full width

const Reservas = ({navigation}) => {

    const { user } = useAuth()
    const [items, setItems] = useState([])

    const cancelReservation = async(idReserva) => {
        if (idReserva) {
            const response = await reservationService.finishReservation(idReserva)
            if (response && response.status === 200) {
                await getReservations()
            }
        }
    }
 
    const getReservations = async () => {
        const data = await reservationService.getReservations(user.idUsuario)
        if (data && data.reservasAbertas) {
            setItems(data.reservasAbertas)
        }
    }

    useEffect(() => {
        getReservations()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reservas abertas ({items.length})</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
            horizontal={true}
            style={styles.menuContent}>
                <FlatList data={items}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={() => 
                    <View style={styles.noData}>
                        <Text>Não há reservas</Text>
                    </View>
                }
                renderItem={({ item }) => 
                    <View style={styles.itemRow}>
                        <View>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                    <View style={styles.cardCol}>
                                        <Text style={styles.statusTitle}>RESTAURANTE</Text>
                                    </View>
                                    <View style={styles.cardCol}>
                                        <Text style={styles.statusTitle}>HORARIO</Text>
                                    </View>
                                    <View style={styles.cardCol}>
                                        <Text style={styles.statusTitle}>MESA(S)</Text>
                                    </View>
                                </View>   
                        </View>
                        <View>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                    <View style={styles.cardCol}>
                                        <Text style={styles.status}>{item.nomeRestaurante}</Text>
                                    </View>
                                    <View style={styles.cardCol}>
                                        <Text style={styles.status}>{DateTime.fromISO(item.dataReserva).toFormat('dd/MM/yyyy - HH:mm')}</Text>
                                    </View>
                                    <View style={styles.cardCol}>
                                        <Text style={styles.status}>{item.nomeMesa}</Text>
                                    </View>
                                </View>   
                        </View>
                        <View style={{marginTop: 30}}>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                <View style={styles.cardCol}>
                                    <Text style={styles.statusTitle}>Nº DA COMANDA</Text>
                                </View>
                                <View style={styles.cardCol}>
                                    <Text style={styles.statusTitle}>STATUS</Text>
                                </View>
                            </View>   
                        </View>
                        <View>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                <View style={styles.cardCol}>
                                    <Text style={styles.status}>{item.idComanda}</Text>
                                </View>
                                <View style={styles.cardCol}>
                                    <Text style={styles.status}>{capitalize(item.status)}</Text>
                                </View>
                            </View>   
                        </View>
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row', marginTop: 20, marginBottom: 10}}>
                                <View style={{marginLeft: 10, width: '40%', alignSelf: 'center'}}>
                                    <TouchableOpacity style={styles.buttonCardapio} onPress={() => navigation.navigate('Cardapio', { idComanda: item.idComanda, idReserva: item.idReserva, idRestaurante: item.idRestaurante, nomeRestaurante: item.nomeRestaurante })}>
                                    <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                        <View style={{width: '70%'}}>
                                            <Text style={{alignSelf: 'center', color: 'white'}}>Cardápio</Text>
                                        </View>     
                                        <View style={{width: '40%'}}>    
                                            <Icon name="arrow-forward" style={{ fontSize:22, color:'white' }} />
                                        </View>
                                    </View>         
                                    </TouchableOpacity>   
                                </View>
                                <View style={{marginRight: 10, width: '40%', alignSelf: 'center'}}>
                                    <TouchableOpacity style={styles.buttonFinaliza} onPress={() => cancelReservation(item.idReserva)}>
                                    <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                        <View style={{width: '70%'}}>
                                            <Text style={{alignSelf: 'center', color: 'white'}}>Finaliza</Text>
                                        </View>  
                                        <View style={{width: '40%'}}>    
                                            <Icon name="clear" style={{ fontSize:22, color:'white' }} />
                                        </View>
                                    </View>    
                                    </TouchableOpacity>
                                </View>
                            </View>  
                    </View>
                } />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16
    },
    menuTitle: {
        marginHorizontal: 20,
        marginTop: 10
    },
    itemRow: {
        flex: 1,
        width: (width - 40),
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#EDEDED',
        padding: 10,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statusTitle: {
        fontSize: 13,
        fontWeight: "bold",
        color: '#5A5A5A'
    },
    status: {
        fontSize: 17
    },
    buttonCardapio: {
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#5A5A5A'
    },
    buttonFinaliza: {
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#ffc127'
    },
    cardCol: {
        marginHorizontal: 10
    },
    noData: {
        width: (width - 40),
        marginVertical: 10,
        marginHorizontal: 20,
    }
})

export default Reservas;