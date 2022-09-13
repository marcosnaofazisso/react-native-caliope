import React from "react";
import { Text, Button, View, StyleSheet } from "react-native";

export default function Home3({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home 3</Text>
            <Text>Você está na home3...</Text>
            <Button
                title="Ir para Home principal de volta..."
                onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'black',
    },
});