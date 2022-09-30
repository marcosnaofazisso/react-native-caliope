import React from "react";
import { Text, View, StyleSheet} from "react-native";


export default function Pedido(props) {

    const item = props;

    return (
        <View style={styles.item}>
            <Text style={styles.text}>Pedido nº: {item.numeroPedido}</Text>
            <Text style={styles.text}>Data: {item.dataPedido}</Text>
            <Text style={styles.text}>Qtd de Items: {item.totalItems}</Text>
            <Text style={styles.text}>Total: {item.valorTotal}</Text>
        </View>
    );

}


const styles = StyleSheet.create({

    item: {
        backgroundColor: '#f1f1f1',
        padding: 20,
        width: '100%',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    text: {
        color: '#252525',
    }
});