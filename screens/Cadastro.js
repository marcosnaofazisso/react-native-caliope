import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";


export default function Cadastro({ navigation, route }) {
    return (
        <View >
            <Text>Cadastro</Text>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#FAF8F8",
        // fontFamily: "Roboto",
        padding: 15,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "black",
        alignSelf: "flex-start",
        padding: 4,
        marginLeft: 10,
        borderRadius: 5,
    },
    buttonTxt: {
        color: "white",
    },
    info: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 20,
    },
    buttonClearCar: {
        width: 90,
        height: 40,
        backgroundColor: "red",
    },
    containerItemPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});