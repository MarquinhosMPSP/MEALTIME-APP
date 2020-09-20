import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, FlatList, TextInput, ScrollView } from "react-native";
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

const Pedidos = ({ route: { params }}) => {

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        const mountOrders = () => {
            if (params && params.items && params.items.length > 0) {
                const pedido = {
                    idPedido: null,
                    items: params.items,
                    total: params.items.reduce((acc, cur) => acc += Number(cur.total), 0).toFixed(2)
                }
                setPedidos([...pedidos, pedido])
            }
        }
        mountOrders()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Pedidos ({pedidos.length})</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
            horizontal={true}
            style={styles.menuContent}>
                <FlatList data={pedidos}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item}) => 
                    <View style={styles.card}>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.itemTitle}>Pedido #{item.idPedido}</Text>
                            <FlatList data={item.items}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({item}) => 
                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.itemContent}>{item.qtd}x</Text>
                                    </View>
                                    <View>
                                        <Text numberOfLines={1} style={styles.itemContent}>{item.nome}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemContent}>R${item.precoCalculado}</Text>
                                    </View>
                                </View>}
                            />
                        </View>
                        <View style={{
                                borderBottomColor: '#C9C9C9',
                                borderBottomWidth: 1,
                                marginTop: 10,
                                marginBottom: 10
                            }}/>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.statusTitle}>Total</Text>
                            </View>
                            <View>
                                <Text style={styles.statusTitle}>R${item.total}</Text>
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
    card: {
        flex: 1,
        width: (width - 40),
        justifyContent: "space-between",
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#E4E4E4',
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
    row: {
        flex: 1,
        marginVertical: 10,
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    itemContent: {
        marginHorizontal: 20,
        fontSize: 18,
    },
    itemActions: {
        width: '30%',
        justifyContent: 'space-between',
        alignItems: "flex-end"
    },
    itemTitle: {
        fontSize: 17,
        marginBottom: 10,
        marginLeft: 10,
    },
    statusTitle: {
        fontSize: 20,
        marginHorizontal: 10,
    },
    total: {
        marginVertical: 10,
        fontSize: 24
    },
    btnBox: {
        flexDirection: "row",
        marginTop: 10
    },
    incDecBtn: {
        fontSize: 30,
        color: '#ffc127',
    },
})

export default Pedidos;