import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";

import { UsuarioContext } from "../context/usuario-context";
import { CarrinhoContext } from "../context/carrinho-context";


export default function Pagamento({ navigation, route }) {

    const { user } = useContext(UsuarioContext)
    const { limparItemsDoCarrinho } = useContext(CarrinhoContext);

    const pedidoCompleto = route.params.pedido;

    let totalPedido = pedidoCompleto.reduce((prev, current) => {
        return prev + +current.price
    }, 0);

    function finalizarPedido() {
        limparItemsDoCarrinho()
        navigation.navigate("HomeScreen")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Pedido</Text>
            <Text></Text>
            {pedidoCompleto.map((item) => {
                return (
                    <View key={item.id} style={styles.containerItemPrice}>
                        <Text>1 x {item.title}</Text>
                        <Text>R${item.price}</Text>
                    </View>
                )
            })}
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>Total do Pedido: R$ {JSON.stringify(totalPedido)}</Text>
            <Text></Text>
            {(Object.keys(user).length != 0) &&
                <View>
                    <Text>Você receberá as informações de pagamento pelo email: {user.email} combinado?</Text>
                    <TouchableOpacity style={styles.button} onPress={() => finalizarPedido()}>
                        <Text style={styles.buttonTxt}>Entendido</Text>
                    </TouchableOpacity>
                </View>
            }
            {(Object.keys(user).length == 0) &&
                <View>
                    <Text>Cadastre-se ou faça um login para finalizar sua compra.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
                        <Text style={styles.buttonTxt}>Fazer Login / Cadastro</Text>
                    </TouchableOpacity>
                </View>}
            <Text></Text>

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