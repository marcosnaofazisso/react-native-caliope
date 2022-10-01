import React, { useContext, useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList, Modal, Animated, Easing, SafeAreaView } from "react-native";

import BotaoChat from "../components/BotaoChat";
import RoupaInfos from "../components/RoupaInfo";

import { CarrinhoContext } from "../context/carrinho-context";

export default function Carrinho({ navigation }) {


    const { listaCarrinho, excluirItemAoCarrinho, limparItemsDoCarrinho } = useContext(CarrinhoContext);
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
            excluirItemAoCarrinho(roupaItemProps.id)
            setRenderizarCarrinho(current => !current)
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
        limparItemsDoCarrinho()
    }

    const [visible, setVisible] = useState(false)
    const scale = useRef(new Animated.Value(0)).current;

    function resizeBox(to) {
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 500,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("Abrindo modal...");
    //         resizeBox(1)
    //     }, 1500)

    //     setTimeout(() => {
    //         console.log("Fechando modal...");
    //         resizeBox(0);
    //     }, 6000)
    // }, [])


    return (
        <View style={styles.container}>


            {/* <Modal transparent visible={visible}>
                <SafeAreaView style={{ flex: 1 }} onTouchStart={() => navigation.navigate('Caliope')}>
                    <Animated.View
                        style={[styles.popup, { transform: [{ scale }] }]}>
                        <Text style={styles.textWhite}>Falta R$100 para você ganhar frete grátis!</Text>
                    </Animated.View>
                </SafeAreaView>
            </Modal> */}


            <Text style={styles.info}>Produtos do Carrinho</Text>
            {listaCarrinho.length > 0 ?
                <View style={styles.containerBtn}>
                    <TouchableOpacity style={styles.button} onPress={() => limparCarrinho()}>
                        <Text style={styles.buttonTxt}>Limpar Carrinho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pagamento', { pedido: listaCarrinho })}>
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
        minWidth: '100%',
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
        padding: 4,
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
    textWhite: {
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 1,
        color: 'white',
    },
    popup: {
        borderRadius: 8,
        borderColor: '#333',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        position: 'absolute',
        backgroundColor: '#ff0066',
        alignSelf: 'center',
        bottom: 120,
        // right: 20,

    }
});
