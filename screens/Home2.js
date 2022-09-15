import React from "react";
import { Text, Button, View, StyleSheet } from "react-native";

export default function Home2({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home 2</Text>
            <Text> </Text>
            <Text> </Text>
            <Text>Detalhes do produto....</Text>
            <Text> </Text>
            <Text> </Text>
            <Button
                title="Ver meu Carrinho..."
                onPress={() => navigation.navigate('Home3')} />
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