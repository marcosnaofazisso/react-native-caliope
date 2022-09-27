import React from "react";
import { Text } from "react-native";

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
import Pagamento from "./screens/Pagamento";
import Menu from "./screens/Menu";
import Cadastro from "./screens/Cadastro";

// ===============================================================================================================


function Tabs() {
    return (
        <Tab.Navigator
            activeColor="#000"
            inactiveColor="grey"
            labeled={true}
            barStyle={{
                borderWidth: 0,
                backgroundColor: '#fff',
                paddingBottom: 12,

            }}

        >
            <Tab.Screen name="Home" component={HomeStack}
                options={{
                    tabBarLabel: <Text style={{ fontSize: 15 }}>Home</Text>,
                }} />
            <Tab.Screen name="Caliope" component={Caliope}
                options={{
                    tabBarLabel: <Text style={{ fontSize: 15 }}>Caliope</Text>,
                    tabBarBadge: '',
                }}
            />
        </Tab.Navigator>
    );
}
function HomeStack(navigation) {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={({ navigation }) => drawerOptionsLoja(navigation)} />
            <Stack.Screen name="Home2" component={RoupaInfos} options={{ title: 'Tela Home 2', headerTitle: "Loja de Roupa" }} />
            <Stack.Screen name="Home3" component={Carrinho} options={{ title: 'Tela Home 3', headerTitle: "Loja de Roupa" }} />
            <Stack.Screen name="Home4" component={Pagamento} options={{ title: 'Tela Home 4', headerTitle: "Loja de Roupa" }} />
            <Stack.Screen name="Home5" component={Menu} options={{ title: 'Tela Home 5', headerTitle: "Menu" }} />
            <Stack.Screen name="Home6" component={Cadastro} options={{ title: 'Tela Home 6', headerTitle: "Cadastro" }} />
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