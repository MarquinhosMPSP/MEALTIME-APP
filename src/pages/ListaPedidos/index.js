import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, Image, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

const ListaPedidos = () => {

    const [items, setItems] = useState([0,1,2,3])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Pedidos finalizados (4)</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
            style={styles.menuContent}>
                <FlatList data={items}
                keyExtractor={item => item}
                renderItem={() => 
                    <View style={styles.itemRow}>
                        <View>
                            <Text style={styles.itemTitle}>Pedido #1</Text>
                                <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                    <View style={{width: '10%'}}>
                                        <Text style={styles.itemContent}>1x</Text>
                                    </View>
                                    <View style={{width: '45%'}}>
                                        <Text style={styles.itemContent2}>Big Mac</Text>
                                    </View>
                                    <View style={{width: '45%'}}>
                                        <Text style={{marginLeft: 55, fontSize: 18, marginBottom: 10}}>R$23,90</Text>
                                    </View>
                                </View>
                                <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                    <View style={{width: '10%'}}>
                                        <Text style={styles.itemContent}>1x</Text>
                                    </View>
                                    <View style={{width: '45%'}}>
                                        <Text style={styles.itemContent2}>Coca Cola 500ml</Text>
                                    </View>
                                    <View style={{width: '45%'}}>
                                        <Text style={{marginLeft: 55, fontSize: 18, marginBottom: 10}}>R$9,90</Text>
                                    </View>
                                </View>
                        </View>
                        
                        <View
                            style={{
                                borderBottomColor: '#C9C9C9',
                                borderBottomWidth: 1,
                                marginTop: 10,
                                marginBottom: 10
                            }}
                        />
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={styles.itemContent}>Subtotal</Text>
                            </View>
                            <View style={{width: '50%'}}>
                                <Text style={styles.itemContent2}>R$33,80</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={styles.itemContent}>Taxa de serviço</Text>
                            </View>
                            <View style={{width: '50%'}}>
                                <Text style={styles.itemContent2}>R$3,80</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={styles.statusTitle}>Total</Text>
                            </View>
                            <View style={{width: '50%'}}>
                                <Text style={styles.statusTitle2}>R$37,60</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#C9C9C9',
                                borderBottomWidth: 1,
                                marginTop: 10,
                                marginBottom: 10
                            }}
                        />
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={styles.statusTitle}>Status</Text>
                            </View>
                            <View style={{width: '50%'}}>
                                <Text style={styles.statusTitle}>Preparando</Text>
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
    itemContent: {
        marginLeft: 10,
        fontSize: 18,
        marginBottom: 10
    },
    itemContent2: {
        marginLeft: 70,
        fontSize: 18,
        marginBottom: 10
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
        marginBottom: 10,
        marginLeft: 10,
    },
    statusTitle2: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 70,
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

export default ListaPedidos;