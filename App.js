import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import Home from './Home'
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import Caliope from "./Caliope";

// ===============================================================================================================


function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Caliope" component={Caliope} />
            {/* <Tab.Screen name="Carrinho" component={Home3} /> */}
        </Tab.Navigator>
    );
}
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Home2" component={Home2} options={{ title: 'Tela Home 2' }} />
            <Stack.Screen name="Home3" component={Home3} options={{ title: 'Tela Home 3' }} />
            <Stack.Screen name="Home4" component={Home4} options={{ title: 'Tela Home 4' }} />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    )
}