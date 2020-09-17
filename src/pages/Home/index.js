import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useAuth } from '../../contexts/auth';
import restaurantService from '../../services/restaurantService';
import websocketService from '../../services/websocketService'

const SearchBar = ({ search }) => (
    <View style={styles.searchBar}>
        <TextInput placeholder="Encontre um restaurante..."
            onChangeText={text => search(text)} 
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.searchInput} />
        <Icon name="search" style={styles.searchIcon} />
    </View>
)

const Home = ({ navigation }) => {

    const { user } = useAuth()
    const [data, setData] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [restaurantsByCategory, setRestaurantsByCategory] = useState({})

    useEffect(() => {
        const getRestaurants = async () => {
            const response = await restaurantService.getRestaurants()
            if (response && response.length > 0) {
                let data = {}
                response.forEach(i => data[i.categoria] = i.restaurantes)
                setRestaurantsByCategory(data)
                setData(response)
                setRestaurants(response)
            }
        }
        const connecToWS = () => websocketService.connect(user.idUsuario)
        getRestaurants()
        connecToWS()
    }, [])

    const resetData = () => {
        const arr = data.map(item => {
            item.restaurantes = restaurantsByCategory[item.categoria]
            return item  
        })
        setRestaurants(arr)
    }

    const matchRestaurantName = (name, pattern) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(pattern.toLowerCase())

    const searchRestaurants = text => {
        resetData()
        if (!text) return
        const source = data
        const filteredRestaurants = source.filter(item => {
            const matches = item.restaurantes.filter(r => matchRestaurantName(r.nomeRestaurante, text))
            if (matches && matches.length > 0) {
                item.restaurantes = matches
                return item
            }
        })
        setRestaurants(filteredRestaurants)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainView} pagingEnabled={true}>
                <SearchBar search={searchRestaurants} />
                {
                    <FlatList 
                        data={restaurants}
                        keyExtractor={item => item.categoria}
                        ListEmptyComponent={
                            <Text style={styles.noResult}>Nenhum resultado foi encontrado!</Text>
                        }
                        ListFooterComponent={
                            <View style={styles.footer} />
                        }
                        renderItem={({ item  }) => 
                            <View style={styles.container}>
                                <Text style={styles.textTitle}>{item.categoria}</Text>
                                <FlatList 
                                    horizontal={true}
                                    keyExtractor={item => item.nomeRestaurante}
                                    data={item.restaurantes}
                                    renderItem={({ item }) =>
                                        <View style={styles.section}>
                                            <TouchableOpacity style={styles.itemBox} 
                                            onPress={() => navigation.navigate('Restaurante', { restaurante: item })}>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.text}>{item.nomeRestaurante}</Text>
                                                </View>
                                                <Image
                                                source={require('./../../assets/restaurants/default.png')}
                                                style={styles.itemImgBox} />
                                            </TouchableOpacity>
                                        </View>
                                } />
                            </View>
                        }
                    />
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 10,
    },
    searchBar: {
        height: 40,
        width: '90%',
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
    textTitle: {
        marginLeft: 10,
        fontSize: 20
    },
    mainView: {
        marginHorizontal: 20,
    },
    section: {
        paddingStart: 10,
        flexDirection: 'column'
    },
    itemBox: {
        position: 'relative',
        width: 100,
        height: 100,
        marginVertical: 15,
        marginEnd: 15,
        backgroundColor: '#fff',
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
    itemImgBox: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    textContainer: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 15
    },
    text: {
        color: '#fff',
        fontWeight: 'bold'
    },
    noResult: {
        textAlign: "center"
    },
    footer: {
        marginVertical: 30
    }
});

export default Home