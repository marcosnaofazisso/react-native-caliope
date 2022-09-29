import React, { useState, useRef, useEffect } from "react";
import { Text, Button, View, StyleSheet, Modal, SafeAreaView, Animated, Easing } from "react-native";

export default function Home3({ navigation }) {

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

    useEffect(() => {
        setTimeout(() => {
            console.log("Abrindo modal...");
            resizeBox(1)
        }, 2000)

        setTimeout(() => {
            console.log("Fechando modal...");
            resizeBox(0);
        }, 5000)
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home 3</Text>
            <Text> </Text>
            <Text>Carrinho</Text>
            <Text> </Text>
            <Text>Receber notificação Calíope, por exemplo:</Text>
            <Text>"Falta R$100 para você ganhar frete grátis"</Text>
            <Text> </Text>
            <Modal transparent visible={visible}>
                <SafeAreaView style={{ flex: 1 }} onTouchStart={() => navigation.navigate('Caliope')}>
                    <Animated.View
                        style={[styles.popup, { transform: [{ scale }] }]}>
                        <Text style={styles.textWhite}>Você ganhou frete grátis!</Text>
                    </Animated.View>
                </SafeAreaView>
            </Modal>
            <Text> </Text>
            <Button
                title="Finalizar compra"
                onPress={() => navigation.navigate('Pagamento')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'black',
    },
    textWhite: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
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
        backgroundColor: 'black',
        alignSelf: 'center',
        top: 50,
        // right: 20,

    }
});