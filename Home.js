import React from "react";
import { Text, Button, View, StyleSheet } from "react-native";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>Aqui seriam mostrados os produtos...</Text>
            <Text>Produto 1</Text>
            <Text>Produto 2</Text>
            <Text>Produto 3</Text>
            <Button
                title="Selecionei algum produto..."
                onPress={() => navigation.navigate('Home2')} />
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