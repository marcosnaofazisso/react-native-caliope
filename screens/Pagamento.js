import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button, FlatList } from "react-native";

import { UsuarioContext } from "../context/usuario-context";
import { CarrinhoContext } from "../context/carrinho-context";


export default function Pagamento({ navigation }) {

    const { user } = useContext(UsuarioContext)
    const { listaCarrinho, limparItemsDoCarrinho } = useContext(CarrinhoContext);

    const [cupomDesconto, setCupomDesconto] = useState('')

    let totalPedido = listaCarrinho.reduce((prev, current) => {
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
            {listaCarrinho.map((item) => {
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
                    <Text style={styles.titleCupomDesconto}>Cupom de Desconto</Text>
                    <TextInput
                        style={styles.inputCupomDesconto}
                        placeholder="Digite aqui seu Cupom de Desconto"
                        value={cupomDesconto}
                        onChangeText={(cupom) => setCupomDesconto(cupom)}
                    />
                    <Text></Text>
                    <Text>Você receberá as informações de pagamento pelo email: <Text style={styles.userEmail}>{user.email}</Text>, combinado?</Text>
                    <Text></Text>
                    <TouchableOpacity style={styles.button} onPress={() => finalizarPedido()}>
                        <Text style={styles.buttonTxt}>Confirmar Pedido</Text>
                    </TouchableOpacity>
                </View>
            }
            {(Object.keys(user).length == 0) &&
                <View>
                    <Text>Cadastre-se ou faça um login para finalizar sua compra.</Text>
                    <Text></Text>
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
    titleCupomDesconto: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    userEmail: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "black",
        alignSelf: "flex-start",
        padding: 4,
        marginLeft: 10,
        borderRadius: 5,
    },
    inputCupomDesconto: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        padding: 12,
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