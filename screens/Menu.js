import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList, SafeAreaView, Image, TextInput } from "react-native";

export default function Menu({ navigation, route }) {

    const avatarPadrao = require('../assets/avatar-menu.png')
    const avatarCris = require('../assets/cris.png')

    const objetoImagens = { avatarPadrao, avatarCris }
    const listaPedidos = [
        {
            id: '1',
            numeroPedido: '12345678',
            dataPedido: '22/09/2022',
            totalItems: '2',
            valorTotal: 'R$ 150'
        },
        {
            id: '2',
            numeroPedido: '12345679',
            dataPedido: '10/09/2022',
            totalItems: '5',
            valorTotal: 'R$ 430'
        },
    ]

    const [avatarEscolhido, setAvatarEscolhido] = useState(objetoImagens.avatarPadrao);


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [login, setLogin] = useState(false);
    const [signin, setSignIn] = useState(false);
    const [testing, setTesting] = useState(false);
    const [verPedidos, setVerPedidos] = useState(false);


    function logarContaTeste() {
        setAvatarEscolhido(objetoImagens.avatarCris)
        setTesting(true)
    }

    return (
        <SafeAreaView>
            {!isLoggedIn &&
                (<View style={styles.container}>
                    <Text>Você está logado anonimamente, para comprar entre ou faça um cadastro.</Text>
                    <Image style={{ height: 90, width: 90, borderRadius: 40 }} source={avatarEscolhido} />
                    <View style={styles.signOrLoginContainer}>
                        {!login && !testing && <TouchableOpacity onPress={() => setLogin(true)}>
                            <Text>Entrar</Text>
                        </TouchableOpacity>}
                        {!signin && !testing && <TouchableOpacity onPress={() => setSignIn(true)}>
                            <Text>Cadastrar</Text>
                        </TouchableOpacity>}
                        {!signin && !testing && <TouchableOpacity onPress={() => logarContaTeste()}>
                            <Text>Login de Teste</Text>
                        </TouchableOpacity>}
                        {testing &&
                            <View>
                                <Text>Cristine Acoccela</Text>
                                <Text>(11) 98765-4321</Text>
                                <Text>cris@caliope.com.br</Text>
                                {!verPedidos && <TouchableOpacity onPress={() => setVerPedidos(true)}>
                                    <Text></Text>
                                    <Text>Ver Meus Pedidos</Text>
                                </TouchableOpacity>}

                                {verPedidos && <View>
                                    <Text></Text>
                                    <Text style={{ fontWeight: 'bold' }}>Pedidos:</Text>
                                    {listaPedidos.map((pedido) => {
                                        return (
                                            <View key={pedido.id}>
                                                <Text>Pedido No: {pedido.numeroPedido}</Text>
                                                <Text>Data: {pedido.dataPedido}</Text>
                                                <Text>Qtd de Items: {pedido.totalItems}</Text>
                                                <Text></Text>
                                            </View>
                                        )
                                    })}</View>}
                            </View>
                        }
                    </View>
                </View>)}
            {login &&
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput style={styles.input}
                        secureTextEntry
                        placeholder="Senha"
                        onChangeText={(senha) => setPassword(senha)}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setLogin(false)} style={styles.button}>
                            <Text style={styles.buttonTxt}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonTxt}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            {signin &&
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                        placeholder="Nome"
                        onChangeText={(nome) => setEmail(nome)}
                    />
                    <TextInput style={styles.input}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput style={styles.input}
                        secureTextEntry
                        placeholder="Senha"
                        onChangeText={(senha) => setSenha(senha)}
                    />
                    <TextInput style={styles.input}
                        secureTextEntry
                        placeholder="Confirme a Senha"
                        onChangeText={(senha) => setSenha(senha)}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setSignIn(false)} style={styles.button}>
                            <Text style={styles.buttonTxt}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonTxt}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#FAF8F8",
        // fontFamily: "Roboto",
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },
    inputContainer: {
        backgroundColor: "#FAF8F8",
        // fontFamily: "Roboto",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: "black",
        alignSelf: "flex-start",
        padding: 4,
        marginLeft: 10,
        borderRadius: 5,
    },
    buttonTxt: {
        color: "white",
    },
    buttonContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    signOrLoginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
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
});
