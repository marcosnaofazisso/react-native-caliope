import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";


export default function Pedido(props) {

    const item = props;

    return (
        <View style={styles.item}>
            <Text>Pedido No: {item.numeroPedido}</Text>
            <Text>Data: {item.dataPedido}</Text>
            <Text>Qtd de Items: {item.totalItems}</Text>
            <Text>Total: {item.valorTotal}</Text>
            <Text></Text>
        </View>
    );

}


const styles = StyleSheet.create({

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});