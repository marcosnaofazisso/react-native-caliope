import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";

import BotaoChat from "../components/BotaoChat";
import RoupaInfos from "../components/RoupaInfo";

import { inventario, carrinho } from "../data/data";


export default function Carrinho({ navigation, route }) {

    const [listaInventario] = useState(inventario);
    const [listaCarrinho, setData2] = useState(carrinho);
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
        setData2({ listaCarrinho: filterData2 }); //seta o carrinho
    }

    return (
        <View style={styles.container}>
            <Text style={styles.info}>Produtos do Carrinho</Text>
            {listaCarrinho.length > 0 ? <TouchableOpacity style={styles.button} onPress={() => limparCarrinho()}>
                <Text style={styles.buttonTxt}>Limpar Carrinho</Text>
            </TouchableOpacity>
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
        backgroundColor: "#FAF8F8",
        // fontFamily: "Roboto",
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
