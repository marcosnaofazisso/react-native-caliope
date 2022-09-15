import React, { useState } from "react";
import { Text, Button, View, StyleSheet } from "react-native";

export default function Home4({ navigation }) {

    const [pago, setPago] = useState(false)

    return (
        <View style={styles.container}>
            <Text>Home 4</Text>
            <Text> </Text>
            <Text>Fase final da jornada</Text>
            <Text> </Text>
            {!pago &&
                <View>
                    <Text>Você receberá as infos do pagamento pelo email</Text>
                    <Text> </Text>
                    <Button
                        title="Pagar"
                        onPress={() => setPago(current => !current)} />
                </View>}

            {pago &&
                <View>
                    <Text> </Text>
                    <Text>Pagamento realizado com sucesso!</Text>
                    <Button
                        title="Voltar para Home"
                        onPress={() => navigation.navigate('Home')} />

                </View>}
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
});