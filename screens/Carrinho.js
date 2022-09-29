import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";

import BotaoChat from "../components/BotaoChat";
import RoupaInfos from "../components/RoupaInfo";

import { inventario, carrinho } from "../data/data";


export default function Carrinho({ navigation, route }) {

    const [listaInventario] = useState(inventario);
    const [listaCarrinho, setListaCarrinho] = useState(carrinho);
    const [renderizarCarrinho, setRenderizarCarrinho] = useState(false)

    const renderRoupa = (itemData) => {
        const item = itemData.item;
        const roupaItemProps = {
            id: item.id,
            title: item.title,
            photo: item.photo,
            price: item.price,
            description: item.description,
            discount: item.discount,
            type: item.type,
        };

        function onPress() {
            var index = listaCarrinho
                .map((x) => {
                    return x.id;
                })
                .indexOf(roupaItemProps.id);

            listaInventario.splice(roupaItemProps.id - 1, 0, listaCarrinho[index]);
            listaCarrinho.splice(index, 1); //o splice limpa o item da lista (carrinho), então é essencial pro funcionamento
            setRenderizarCarrinho(current => !current) //controla a renderização da tela

        }

        return (
            <RoupaInfos
                {...roupaItemProps}
                car
                car2
                onPress2={onPress}
            />
        );
    };

    function limparCarrinho() {
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
    }

    return (
        <View style={styles.container}>
            <Text style={styles.info}>Produtos do Carrinho</Text>
            {listaCarrinho.length > 0 ?
                <View style={styles.containerBtn}>
                    <TouchableOpacity style={styles.button} onPress={() => limparCarrinho()}>
                        <Text style={styles.buttonTxt}>Limpar Carrinho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home4', { pedido: listaCarrinho })}>
                        <Text style={styles.buttonTxt}>Finalizar Pedido</Text>
                    </TouchableOpacity>
                </View>
                : null}
            <FlatList
                data={listaCarrinho}
                keyExtractor={(item) => item.id}
                renderItem={renderRoupa}
            />

            <BotaoChat navigation={() => navigation.navigate("Caliope")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingRight: 5,
        paddingLeft: 5,
        minWidth:'100%',
        height: '100%',
        backgroundColor: "#FAF8F8",
        // fontFamily: "Roboto",
    },
    containerBtn: {
        flex: 1,
        zIndex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        width: 110,
        height: 28,
        backgroundColor: "black",
        padding:4,
        zIndex: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    buttonTxt: {
        color: "white",
        justifyContent: "center",
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
