import React from 'react';
import { Text, TouchableOpacity, Image } from "react-native";

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
                    <Image style={{ height: 20, width: 20 }} source={require('../assets/carrinho.png')} />

                </TouchableOpacity>
            );
        },
        headerRightContainerStyle: { marginRight: 20 },

        drawerIcon: ({ color, size }) => {
            return <Text style={{ color: 'white' }}>Aqui seria um icone</Text>;

        },
        drawerLabel: "Home",
        // drawerItemStyle: {
        //   height: height,
        // },
    };
};
