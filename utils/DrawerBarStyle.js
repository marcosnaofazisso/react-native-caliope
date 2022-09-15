import React from 'react';
import { Text, TouchableOpacity } from "react-native";

export const drawerOptionsLoja = (navigation) => {
    return {
        headerTitle: "Loja de Roupa",
        headerTitleStyle: { fontSize: 18 },
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#FAF8F8" },
        headerTintColor: "black",

        headerRight: () => {
            return (
                <TouchableOpacity>
                    <Text>Aqui seria um icone</Text>
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
