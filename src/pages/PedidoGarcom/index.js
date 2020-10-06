import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { useAuth } from '../../contexts/auth';
import reservationService from '../../services/reservationService';
import restaurantService from '../../services/restaurantService';
import orderService from '../../services/orderService';

const PedidoGarcom = () => {

    const { user } = useAuth()

    const [selectedMesa, setSelectedMesa] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [mesas, setMesas] = useState([]);
    const [itens, setItens] = useState([]);

    const addToCart = async() => {
        const item = itens.filter(i => i.idItem === selectedItem)
        if (item) {
            const data = { pedidos: item, idComanda: selectedMesa, dataReserva: new Date(), nomeRestaurante: user.nomeRestaurante }
            await orderService.makeOrder(data)
        }
    }

    const getOrderPadsAndTables = async() => {
        const response = await reservationService.getOrderPadsAndTables(user.idRestaurante)
        if (response) {
            setMesas(response)
            if (response.length > 0) {
                setSelectedMesa(response[0].idComanda)
            }
        }
    }

    const getMenuByRestaurant = async() => {
        const response = await restaurantService.getRestaurantMenu(user.idRestaurante)
        if (response) {
            setItens(response)
            if (response.length > 0) {
                setSelectedItem(response[0].idItem)
            }
        }
    }

    useEffect(() => {
        getOrderPadsAndTables()
        getMenuByRestaurant()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Novo pedido</Text>
            <View style={styles.section}>
                <Text style={{ margin: 10, textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                    Escolha a comanda pela mesa
                </Text>
                {
                    (mesas && mesas.length > 0) && (itens && itens.length > 0) ?
                    <Picker
                        selectedValue={selectedMesa}
                        style={{ marginHorizontal: 20 }}
                        onValueChange={itemValue => setSelectedMesa(itemValue)}>
                        {
                            mesas.map(mesa => 
                                <Picker.Item key={mesa.idComanda} label={`${mesa.nomeMesa} - Comanda ${mesa.idComanda}`} value={mesa.idComanda} />
                            )
                        }
                    </Picker>
                    : <Text style={{ textAlign: 'center', margin: 25 }}>Não há comandas abertas no restaurante.</Text> 
                }
            </View> 

            <View style={styles.section}>  
                <Text style={{ margin: 10, textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                    Escolha o item para incluir na comanda
                </Text>
                {
                    (mesas && mesas.length > 0) && (itens && itens.length > 0) ?
                    <Picker
                        selectedValue={selectedItem}
                        style={{ marginHorizontal: 20 }}
                        onValueChange={itemValue => setSelectedItem(itemValue)}>
                        {
                            itens.map((item, idx) => 
                                <Picker.Item key={idx} label={`${item.nome} - R$${item.precoCalculado.toFixed(2)} (${item.disponivel ? 'Disp.' : 'Falta'})`} value={item.idItem} />
                            )
                        }
                    </Picker>
                    : <Text style={{ textAlign: 'center', margin: 25 }}>Não há items para visualizar no cardápio.</Text>
                }
            </View>

            <View>
                <TouchableOpacity style={styles.buttonFinaliza} onPress={() => addToCart()}>
                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontWeight: "bold" }}>Adicionar item à comanda</Text>
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
        marginBottom: 10,
    },
    buttonFinaliza: {
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 80,
        marginVertical: 30,
        backgroundColor: '#ffc127'
    },
    section: { backgroundColor: '#fff', padding: 10, borderRadius: 15, margin: 25 }
});

export default PedidoGarcom