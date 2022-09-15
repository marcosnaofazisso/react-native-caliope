import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function RoupaInfo(props) {
    return (
        <View style={styles.imgContainer}>
            <View style={styles.singularContainer}>
                <Image source={props.photo} resizeMode="contain" style={styles.img} />
                <View style={styles.textContainer}>
                    <Text style={styles.txtImg}>{props.title} </Text>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1, flexWrap: "wrap" }}>
                            Descrição: {props.description}
                        </Text>
                    </View>
                    {!props.car && (
                        <TouchableOpacity style={styles.comprar} onPress={props.onPress}>
                            <Text style={styles.comprarTxt}>Comprar</Text>
                        </TouchableOpacity>
                    )}
                    {props.car2 && (
                        <TouchableOpacity
                            style={styles.comprar}
                            onPress={() => props.onPress2()}
                        >
                            <Text style={styles.comprarTxt}>Excluir</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 10,
    },
    singularContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    img: {
        width: 250,
        height: 250,
        marginHorizontal: -20,
    },
    textContainer: {
        flex: 1,
    },
    txtImg: {
        fontWeight: "bold",
    },
    priceImg: {
        color: "black",
    },
    descricao: {
        flexWrap: "wrap",
    },
    comprar: {
        backgroundColor: "black",
        alignSelf: "flex-start",
        marginTop: 80,
        padding: 10,
    },
    verificar: {
        backgroundColor: "black",
        alignSelf: "flex-start",
        marginTop: 10,
        padding: 10,
    },
    comprarTxt: {
        color: "white",
    },
});
