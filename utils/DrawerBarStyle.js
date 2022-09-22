import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, } from "react-native";

export const drawerOptionsLoja = (navigation) => {
    return {
        headerTitle: "Loja de Roupa",
        headerTitleStyle: { fontSize: 18 },
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#FAF8F8" },
        headerTintColor: "black",

        headerRight: () => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("Home3")}>
                    <Image style={styles.carrinho} source={require('../assets/carrinho.png')} />
                </TouchableOpacity>
            );
        },
        headerLeft: () => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("Home5")}>
                    <Image style={{ height: 40, width: 40, marginLeft: 10 }} source={require('../assets/menu.jpg')} />
                </TouchableOpacity>
            );
        },
        headerRightContainerStyle: { marginRight: 20 },

        drawerIcon: ({ color, size }) => {
            return <Text>Aqui seria um icone</Text>;

        },
        drawerLabel: "Home",
        // drawerItemStyle: {
        //   height: height,
        // },
    };
};


const styles = StyleSheet.create({
    carrinho: {
        width:20,
        height: 20,
        marginLeft:'auto',
        marginRight:10,
    },
})