import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import Caliope from "./Caliope";

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>Você está na home...</Text>
        </View>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Tela inicial Home' }} />
                <Stack.Screen
                    name="Caliope"
                    component={Caliope}
                    options={{ title: 'Tela Caliope' }} />
            </Stack.Navigator>
        </NavigationContainer>
        // <View style={styles.container}>
        //     <Text style={styles.text}>Ola mundo</Text>
        //     <TouchableOpacity>
        //         <Text>Ir para Caliope</Text>
        //     </TouchableOpacity>
        // </View>
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