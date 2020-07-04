import React, { Component } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  ScrollView 
}  from 'react-native';

export default class App extends Component {
  render () {
    return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}> Tingo</Text>
        <Text style={styles.postDescription}> O feio</Text> 
      </View>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}> Tingo</Text>
        <Text style={styles.postDescription}> O feio</Text> 
      </View>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}> Tingo</Text>
        <Text style={styles.postDescription}> O feio</Text> 
      </View>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}> Tingo</Text>
        <Text style={styles.postDescription}> O feio</Text> 
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  postContainer:{
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 3
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: 'center'
    
  },
  postDescription: {
    color: "#666",
    textAlign: 'center'
  }
});
