import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { drawerOptionsLoja } from "./utils/DrawerBarStyle";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


import Home from './screens/Home'
import Home2 from "./screens/Home2";
import Home3 from "./screens/Home3";
import Home4 from "./screens/Home4";

import Caliope from "./Caliope";

import RoupaInfos from "./screens/RoupaInfos";
import Carrinho from "./screens/Carrinho";
import RoupaInfo from "./components/RoupaInfo";

// ===============================================================================================================


function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Caliope" component={Caliope} />
        </Tab.Navigator>
    );
}
function HomeStack(navigation) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={({ navigation }) => drawerOptionsLoja(navigation)} />
            <Stack.Screen name="Home2" component={RoupaInfos} options={{ title: 'Tela Home 2', headerTitle: "Loja de Roupa" }} />
            <Stack.Screen name="Home3" component={Carrinho} options={{ title: 'Tela Home 3', headerTitle: "Loja de Roupa" }} />
            <Stack.Screen name="Home4" component={Home4} options={{ title: 'Tela Home 4', headerTitle: "Loja de Roupa" }} />
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