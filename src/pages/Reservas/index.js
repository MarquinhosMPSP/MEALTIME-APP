import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, Image, TextInput, ScrollView, Button } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

const Reservas = ({navigation}) => {

    const [items, setItems] = useState([0,1])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reservas abertas (2) </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
            style={styles.menuContent}>
                <FlatList data={items}
                keyExtractor={item => item}
                renderItem={() => 
                    <View style={styles.itemRow}>
                        <View>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                    <View style={{marginLeft: 10, width: '40%'}}>
                                        <Text style={styles.statusTitle}>RESTAURANTE</Text>
                                    </View>
                                    <View style={{width: '30%'}}>
                                        <Text style={styles.statusTitle}>HORARIO</Text>
                                    </View>
                                    <View style={{width: '30%'}}>
                                        <Text style={styles.statusTitle}>MESA(S)</Text>
                                    </View>
                                </View>   
                        </View>
                        <View>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                    <View style={{marginLeft: 10, width: '40%'}}>
                                        <Text style={styles.status}>McDonald's</Text>
                                    </View>
                                    <View style={{width: '30%'}}>
                                        <Text style={styles.status}>12:00</Text>
                                    </View>
                                    <View style={{width: '30%'}}>
                                        <Text style={styles.status}>10, 11</Text>
                                    </View>
                                </View>   
                        </View>
                        <View style={{marginTop: 30}}>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                <View style={{marginLeft: 10, width: '70%'}}>
                                    <Text style={styles.statusTitle}>Nº DA COMANDA</Text>
                                </View>
                                <View style={{marginRight: 10, width: '30%'}}>
                                    <Text style={styles.statusTitle}>STATUS</Text>
                                </View>
                            </View>   
                        </View>
                        <View>
                            <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row'}}>
                                <View style={{marginLeft: 10, width: '65%'}}>
                                    <Text style={styles.status}>A123456</Text>
                                </View>
                                <View style={{marginRight: 10, width: '35%'}}>
                                    <Text style={styles.status}>Aguardando</Text>
                                </View>
                            </View>   
                        </View>
                        <View style={{flex: 1, justifyContent: "space-between", flexDirection: 'row', marginTop: 20, marginBottom: 10}}>
                                <View style={{marginLeft: 10, width: '40%', alignSelf: 'center'}}>
                                    <TouchableOpacity style={styles.buttonCardapio} onPress={() => navigation.navigate('Cardapio')}>
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
                                    <TouchableOpacity style={styles.buttonFinaliza}>
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
        justifyContent: "space-between",
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
})

export default Reservas;