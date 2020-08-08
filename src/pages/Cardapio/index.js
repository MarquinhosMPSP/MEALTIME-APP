import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, Image, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

const Cardapio = () => {

    const [items, setItems] = useState([0,1,2,3])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>McDonalds</Text>
                <TouchableOpacity style={styles.addToCart}>
                    <Text style={{ marginRight: 10 }}>Itens (2)</Text>
                    <Icon name="shopping-basket" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.menuTitle}>
                <Text style={styles.subtitle}>Cardápio</Text>
                <View style={styles.searchBar}>
                    <TextInput placeholder="Encontre um item..."
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={styles.searchInput} />
                    <Icon name="search" style={styles.searchIcon} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
            style={styles.menuContent}>
                <FlatList data={items}
                keyExtractor={item => item}
                renderItem={() => 
                    <View style={styles.itemRow}>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>Big Mac</Text>
                            <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc turpis enim, mollis eu viverra eget, maximus nec odio. Fusce dictum ante nisi, et semper sem dapibus nec.
                            </Text>
                        </View>
                        <View style={styles.itemActions}>
                            <View style={styles.btnBox}>
                                <TouchableOpacity style={{ marginRight: 10 }}>
                                    <Icon name="remove-circle" style={styles.incDecBtn} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20 }}>1</Text>
                                <TouchableOpacity style={{ marginLeft: 10 }}>
                                    <Icon name="add-circle" style={styles.incDecBtn} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.total}>R$ 23,90</Text>
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
    addToCart: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 30,
        color: '#ffc127'
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
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
        width: '60%',
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
    btnBox: {
        flexDirection: "row",
        marginTop: 10
    },
    incDecBtn: {
        fontSize: 30,
        color: '#ffc127',
    },
})

export default Cardapio;