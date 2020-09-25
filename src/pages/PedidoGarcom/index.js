import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'

const PedidoGarcom = () => {

    const [selectedMesa, setSelectedMesa] = useState("");
    const [selectedItem, setSelectedItem] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Novo pedido</Text>
            <View>
                <Text style={{ marginLeft: 25, fontSize: 15, color: '#524D4C', fontWeight: 'bold' }}>
                    Escolha a comanda pela mesa
                </Text>
                <Picker
                    selectedValue={selectedMesa}
                    style={{ marginLeft: 20, marginRight: 15 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedMesa(itemValue)}>
                    <Picker.Item label="Mesa 1" value="mesa2" />
                    <Picker.Item label="Mesa 2" value="mesa1" />
                </Picker>
            </View>

            <View>
                <Text style={{ marginLeft: 25, fontSize: 15, color: '#524D4C', fontWeight: 'bold' }}>
                    Escolha o item para incluir na comanda
                </Text>
                <Picker
                    selectedValue={setSelectedItem}
                    style={{ marginLeft: 20, marginRight: 15 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}>
                    <Picker.Item label="Brasileiro 1" value="mesa2" />
                    <Picker.Item label="Brasileiro 2" value="mesa1" />
                </Picker>
            </View>

            <View>
                <TouchableOpacity style={styles.buttonFinaliza}>
                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontWeight: "bold" }}>Adicionar item à comanda</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "column",
        marginVertical: 30
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
        color: '#524D4C',
        marginTop: 60,
    },
    buttonFinaliza: {
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 80,
        backgroundColor: '#ffc127'
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
        color: '#524D4C'
    },
    incDecBtn: {
        marginTop: 25,
        fontSize: 30,
        color: '#ffc127',
        marginHorizontal: 10,
    },
});

export default PedidoGarcom