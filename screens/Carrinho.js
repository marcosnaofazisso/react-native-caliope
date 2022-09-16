import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList } from "react-native";


import BotaoChat from "../components/BotaoChat";
import RoupaInfos from "../components/RoupaInfo";

import { inventario, carrinho } from "../data/data";


export default function Carrinho({ navigation, route }) {

    const [data] = useState(inventario); 
    const [data2, setData2] = useState(carrinho); 
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
            var index = data2
                .map((x) => {
                    return x.id;
                })
                .indexOf(roupaItemProps.id);

            data.splice(roupaItemProps.id - 1, 0, data2[index]);
            data2.splice(index, 1); //o splice limpa o item da lista (carrinho), então é essencial pro funcionamento
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
        data2.forEach((itemDoCarrinho) => {  // cada item que está no carrinho, passamos para inventário
            var index = data2
                .map((x) => {
                    return x.id;
                })
                .indexOf(itemDoCarrinho.id);
            data.splice(itemDoCarrinho.id - 1, 0, data2[index]);

        });
        const filterData2 = data2.splice(0, data2.length); //limpa o carrinho
        setData2({ data2: filterData2 }); //seta o carrinho
    }

    return (
        <View style={styles.container}>
            <Text style={styles.info}>Produtos do Carrinho</Text>
            {data2.length > 0 ? <TouchableOpacity style={styles.button} onPress={() => limparCarrinho()}>
                <Text style={styles.buttonTxt}>Limpar Carrinho</Text>
            </TouchableOpacity>
                : null}
            <FlatList
                data={data2}
                keyExtractor={(item) => item.id}
                renderItem={renderRoupa}
            />
            <BotaoChat navigation={() => navigation.navigate("Home")} />
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
