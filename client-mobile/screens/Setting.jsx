import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const image = { uri: 'https://images.unsplash.com/photo-1607720146778-68d2d56fa38c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1097&q=80' };


export default function Setting() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1605910347035-59a2b94f2061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=709&q=80",
        }}
        style={styles.background}
      >
       <Text style={styles.text}>We are working on this feature , we are sorry for the inconvenience.</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      background: {
        flex: 1,
        resizeMode: "cover",
      },
    text: {
      color: 'white',
      fontSize: 42,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 50,
    },
  });
  