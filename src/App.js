import React, { Component } from 'react';
import { StyleSheet, SafeAreaView }  from 'react-native';
import Login from './pages/Login';

export default class App extends Component {
  render () {
    return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
