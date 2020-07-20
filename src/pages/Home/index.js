import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, Button } from 'react-native'
import { useAuth } from '../../contexts/auth';


const Home = () => {

    const { logout } = useAuth()

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.inputText} placeholder="Encontre um restaurante..." />
            <Button title="logout" onPress={() => logout()} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    logo: {
        width: "70%",
        resizeMode: "contain",
        height: 40,
        alignSelf: 'center',
        marginTop: 15
    },
    inputText: {
        height: 40,
        width: '85%',
        marginTop: 15,
        paddingHorizontal: 15,
        borderColor: 'gray',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#fff',
        color: 'gray',
        alignSelf: 'center' 
    },
});

export default Home