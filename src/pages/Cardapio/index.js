import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, Modal, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Dimensions } from "react-native";
import restaurantService from '../../services/restaurantService'
import orderService from '../../services/orderService'

var width = Dimensions.get('window').width; //full width

const Cardapio = ({ route: { params }, navigation }) => {

    const [items, setItems] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [data, setData] = useState([])
    const [changes, setChanges] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [observations, setObservations] = useState("");

    initializeItem = data => data.map(item => ({ ...item, qtd: 0, total: (item.precoCalculado || 0).toFixed(2) }))

    const handleItem = (item, action) => {
        if (action === 'dec' && !item.qtd) return
        item.qtd = action === 'add' ? item.qtd + 1 : item.qtd - 1
        item.total = item.qtd ? (item.qtd * (item.precoCalculado || 0)).toFixed(2) : (item.precoCalculado || 0).toFixed(2)
        setChanges(changes + 1)
    }

    const clearObservations = () => items.forEach(item => item.observacoes = null)

    const addToCart = async () => {
        const pedidosSelecionados = items.filter(item => item.qtd > 0)
        if (pedidosSelecionados && pedidosSelecionados.length > 0) {
            const data = { pedidos: pedidosSelecionados, idComanda: params.idComanda, dataReserva: params.dataReserva, nomeRestaurante: params.nomeRestaurante }
            await orderService.makeOrder(data)
            clearObservations()
        }
    }

    const searchOrders = text => {
        setItems(data)
        if (!text) return
        const source = data
        const filteredItems = source.filter(item => item.nome.toLowerCase().includes(text.toLowerCase()))
        setItems(filteredItems)
    }

    useEffect(() => {
        const getRestaurantMenu = async () => {
            let data = await restaurantService.getRestaurantMenu(params.idRestaurante)
            if (data && data.length > 0) {
                data = initializeItem(data)
                setItems(data)
                setData(data)
            }
        }
        getRestaurantMenu()
    }, [])

    const openModal = item => {
        setSelectedItem(item)
        setModalVisible(value => !value)
    }
   
    const addObservations = () => {
        const itemIdx = items.findIndex(i => i.idItem === selectedItem.idItem)
        if (items[itemIdx] && observations) {
            const item = items[itemIdx]
            item.observacoes = observations
        }
        setObservations("")
        setModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{params.nomeRestaurante}</Text>
                {
                    !params.view ?
                        <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Pedidos', { items: pedidos, idComanda: params.idComanda })}>
                            <Text style={{ marginRight: 10 }}>Pedidos</Text>
                            <Icon name="local-mall" style={styles.icon} />
                        </TouchableOpacity>
                        : null
                }
            </View>
            <View style={styles.menuTitle}>
                <Text style={styles.subtitle}>Cardápio</Text>
                <View style={styles.searchBar}>
                    <TextInput placeholder="Encontre um item..."
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={text => searchOrders(text)}
                        style={styles.searchInput} />
                    <Icon name="search" style={styles.searchIcon} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                horizontal={true}
                style={styles.menuContent}>
                <FlatList data={items}
                    keyExtractor={(item, index) => String(index)}
                    extraData={changes}
                    renderItem={({ item }) =>
                        <View style={styles.itemRow}>
                            <View style={styles.itemContent}>
                                <Text style={styles.itemTitle}>{item.nome}</Text>
                                <Text>
                                    {item.descricao}
                                </Text>
                                {
                                    !params.view ?
                                    <TouchableOpacity style={styles.observations} onPress={() => openModal(item)}>
                                        <Icon name="note-add" style={styles.icon2} />
                                        <Text>Adicionar observação</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                            </View>
                            <View style={styles.itemActions}>
                                {!params.view ?
                                    <View style={styles.btnBox}>
                                        <TouchableOpacity style={{ marginRight: 10 }}>
                                            <Icon name="remove-circle" style={styles.qtdButton} onPress={() => handleItem(item, 'dec')} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 20, marginTop: 5 }}>{item.qtd}</Text>
                                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => handleItem(item, 'add')}>
                                            <Icon name="add-circle" style={styles.qtdButton} />
                                        </TouchableOpacity>
                                    </View> : null
                                }
                                <Text style={styles.total}>R${item.total}</Text>
                                {
                                    item && item.promocao ?
                                    <>
                                        <Text style={styles.desconto}>-{item.promocao}%</Text>
                                        <Text style={{fontSize: 16, color: '#d50000'}}> aplicado</Text>
                                    </>
                                    : null
                                }
                            </View>
                        </View>
                    } />
            </ScrollView>
            { !params.view ?
                <View style={{ margin: 20 }}>
                    <TouchableOpacity style={styles.orderBtn} onPress={addToCart}>
                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>Fazer pedido</Text>
                    </TouchableOpacity>
                </View> : null
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Escreva as observações para esse prato:
                        </Text>

                        <TextInput
                        style={{ backgroundColor: 'rgba(0, 0, 0, .1)', padding: 10, borderRadius: 10, margin: 10, width: "90%"}}
                        multiline={true}
                        numberOfLines={4}
                        autoCapitalize="none"
                        placeholder="Ex: sem picles e cebola..."
                        onChangeText={(text) => setObservations(text)}/>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "transparent" }}
                            
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                                <Text style={styles.textStyle}>Fechar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#ffc127" }}
                            disabled={!observations}
                            onPress={() => {
                                addObservations(!modalVisible);
                            }}>
                                <Text style={styles.textStyle}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        fontSize: 24
    },
    menuTitle: {
        marginHorizontal: 20,
        marginTop: 10
    },
    subtitle: {
        fontSize: 20
    },
    searchBar: {
        height: 40,
        marginTop: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchIcon: {
        color: '#666',
        fontSize: 25
    },
    searchInput: {
        width: '90%'
    },
    cart: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 30,
        color: '#ffc127'
    },
    icon2: {
        fontSize: 20,
        marginHorizontal: 5,
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: (width - 40),
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#fff',
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
    itemContent: {
        width: '60%'
    },
    itemActions: {
        width: '30%',
        justifyContent: 'space-between',
        alignItems: "flex-end"
    },
    itemTitle: {
        fontSize: 18,
        marginBottom: 10
    },
    total: {
        marginVertical: 10,
        fontSize: 24
    },
    desconto: {
        fontSize: 20,
        color: '#d50000'
    },
    btnBox: {
        flexDirection: "row",
        marginTop: 10
    },
    qtdButton: {
        fontSize: 40,
        color: '#ffc127',
    },
    orderBtn: {
        marginHorizontal: 25,
        padding: 10,
        backgroundColor: '#ffc127',
        borderRadius: 15,
    },
    observations: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffc127',
        padding: 10,
        borderRadius: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, .3)',
    },
    modalView: {
        margin: 20,
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
})

export default Cardapio;