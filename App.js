import React from "react";
import { Text } from "react-native";

import UsuarioContextProvider from "./context/usuario-context";
import CarrinhoContextProvider from "./context/carrinho-context";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { drawerOptionsLoja } from "./utils/DrawerBarStyle";


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


import Home from './screens/Home'
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
            <Tab.Screen name="HomeTab" component={HomeStack}
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
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={Home} options={({ navigation }) => drawerOptionsLoja(navigation)} />
            <Stack.Screen name="RoupaInfos" component={RoupaInfos} options={{ headerTitle: "Loja de Roupa" }} />
            <Stack.Screen name="Carrinho" component={Carrinho} options={{ headerTitle: "Loja de Roupa" }} />
            <Stack.Screen name="Pagamento" component={Pagamento} options={{ headerTitle: "Loja de Roupa" }} />
            <Stack.Screen name="Menu" component={Menu} options={{ headerTitle: "Menu" }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerTitle: "Cadastro" }} />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <UsuarioContextProvider>
                <CarrinhoContextProvider>
                    <Tabs />
                </CarrinhoContextProvider>
            </UsuarioContextProvider>
        </NavigationContainer>
    )
}