import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";


import { inventario, carrinho } from "../data/data";

export default function Pagamento({ navigation, route }) {

    const [listaInventario] = useState(inventario);
    const [listaCarrinho, setListaCarrinho] = useState(carrinho);

    const pedidoCompleto = route.params.pedido;

    let totalPedido = pedidoCompleto.reduce((prev, current) => {
        return prev + +current.price
    }, 0);

    function finalizarPedido() {
        listaCarrinho.forEach((itemDoCarrinho) => {  // cada item que está no carrinho, passamos para inventário
            var index = listaCarrinho
                .map((x) => {
                    return x.id;
                })
                .indexOf(itemDoCarrinho.id);
            listaInventario.splice(itemDoCarrinho.id - 1, 0, listaCarrinho[index]);

        });
        const filterData2 = listaCarrinho.splice(0, listaCarrinho.length); //limpa o carrinho
        setListaCarrinho({ listaCarrinho: filterData2 }); //seta o carrinho

        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Pedido</Text>
            <Text></Text>
            {pedidoCompleto.map((item) => {
                return (
                    <Text>1 x {item.title}</Text>
                )
            })}
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>Total do Pedido: R$ {JSON.stringify(totalPedido)}</Text>
            <Text></Text>
            <Text>Você receberá as informações de pagamento por email, combinado?</Text>
            <Text></Text>
            <TouchableOpacity style={styles.button} onPress={() => finalizarPedido()}>
                <Text style={styles.buttonTxt}>Entendido</Text>
            </TouchableOpacity>
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
});