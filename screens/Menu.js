import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, FlatList, SafeAreaView, Image, Alert, TextInput } from "react-native";

import Pedido from "./Pedido";

import { listaPedidos } from "../data/listaPedidos";
import { apiUsuario } from "../api";

export default function Menu({ navigation, route }) {

    const avatarPadrao = require('../assets/avatar-menu.png')
    const avatarCris = require('../assets/cristine@caliope.com.br.png')
    const avatarPri = require('../assets/priscila@caliope.com.br.jpeg')
    const avatarMaciel = require('../assets/marcosmaciel@caliope.com.br.jpg')
    const avatarJojo = require('../assets/jonathan@caliope.com.br.jpg')

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [recoverPassword, setRecoverPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

    const [email, setEmail] = useState("cristine@caliope.com.br");
    const [password, setPassword] = useState("123456789");

    const [login, setLogin] = useState(false);
    const [signin, setSignIn] = useState(false);
    const [testing, setTesting] = useState(false);
    const [verPedidos, setVerPedidos] = useState(false);

    const [usuario, setUsuario] = useState();
    const [listaDeUsuarios, setListaDeUsuarios] = useState([]);


    const usuariosTeste = {
        'cristine@caliope.com.br': avatarCris,
        'priscila@caliope.com.br': avatarPri,
        'marcosmaciel@caliope.com.br': avatarMaciel,
        'jonathan@caliope.com.br': avatarJojo
    }

    function logarContaTeste() {
        let existeCadastro = false
        for (let i = 0; i < listaDeUsuarios.length; i++) {
            if (listaDeUsuarios[i].email === email && listaDeUsuarios[i].senha === password) {
                console.log('Logando usuario...')
                setUsuario(listaDeUsuarios[i])
                setTesting(true)
                existeCadastro = true
                break
            }
        }
        if (!existeCadastro) {
            Alert.alert("Dados inválidos.", "Por favor, verifique os dados inseridos e tente novamente.")
        }

    }

    function renderPedido(data) {
        const item = data.item;
        const pedidoItem = {
            id: item.id,
            numeroPedido: item.numeroPedido,
            dataPedido: item.dataPedido,
            totalItems: item.totalItems,
            valorTotal: item.valorTotal
        }

        return (
            <Pedido {...pedidoItem} />)

    }

    useEffect(() => {
        const getAllUsuarios = async () => {
            const response = await apiUsuario.get('/usuario')
            setListaDeUsuarios(response.data)
            console.log("GET Status Code: ", response.status);
            console.log("Response Data: ", JSON.stringify(response.data));
        }
        getAllUsuarios()
    }, [])

    async function deletarConta(id) {
        const response = await apiUsuario.delete(`/usuario/${id}`)
        console.log("DELETE Status Code: ", response.status);
        ToastAndroid.show("Conta deletada com sucesso. Sentiremos saudades", ToastAndroid.SHORT)
        navigation.goBack()
    }



    async function alterarSenha(usuario, novaSenha, novaSenhaConfirmada) {
        if (novaSenha != novaSenhaConfirmada) {
            ToastAndroid.show("Por favor, confirme sua senha.", ToastAndroid.SHORT)
        } else {
            const response = await apiUsuario.put(`/usuario/${usuario.id}`, {
                "nome": usuario.nome,
                "cpf": usuario.cpf,
                "numeroCelular": usuario.numeroCelular,
                "email": usuario.email,
                "senha": novaSenha
            })
            console.log("PUT Status Code:", response.status)
            ToastAndroid.show("Senha alterada com sucesso!", ToastAndroid.SHORT)
            setRecoverPassword(false)
        }

    }



    const PerfilUsuario = () => (
        <View>
            <Text>{usuario.nome}</Text>
            <Text>{usuario.numeroCelular}</Text>
            <Text>{usuario.email}</Text>
            <Text></Text>
            {!verPedidos &&
                <TouchableOpacity onPress={() => setVerPedidos(true)}>
                    <Text >Ver Meus Pedidos</Text>
                </TouchableOpacity>}
            <Text></Text>
            <TouchableOpacity onPress={() => deletarConta(usuario.id)} style={styles.buttonDeletarConta}>
                <Text style={styles.buttonTxt}>Deletar Conta</Text>
            </TouchableOpacity>
            <Text></Text>
            {!recoverPassword && <TouchableOpacity onPress={() => setRecoverPassword(true)}>
                <Text>Alterar Senha</Text>
            </TouchableOpacity>}
            {recoverPassword &&
                <View>
                    <TextInput style={styles.input}
                        secureTextEntry
                        placeholder="Digite sua Nova Senha"
                        value={newPassword}
                        onChangeText={(novaSenha) => setNewPassword(novaSenha)}
                    />
                    <TextInput style={styles.input}
                        secureTextEntry
                        placeholder="Confirme sua Nova Senha"
                        value={confirmedNewPassword}
                        onChangeText={(novaSenhaConfirmada) => setConfirmedNewPassword(novaSenhaConfirmada)}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setRecoverPassword(false)} style={styles.button}>
                            <Text style={styles.buttonTxt}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alterarSenha(usuario, newPassword, confirmedNewPassword)} style={styles.button}>
                            <Text style={styles.buttonTxt}>Alterar Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )



    return (
        <SafeAreaView>
            {!isLoggedIn &&
                (<View style={styles.container}>
                    {!testing && <Text>Você está logado anonimamente, para comprar entre ou faça um cadastro.</Text>}
                    <Image style={styles.imagemAvatar} source={usuariosTeste[email] ? usuariosTeste[email] : avatarPadrao} />

                    {testing && <PerfilUsuario />}

                    {verPedidos &&
                        <View>
                            <Text style={{ fontWeight: 'bold', marginTop: 15, marginBottom: 10 }}>Meus Pedidos</Text>
                            <TouchableOpacity onPress={() => setVerPedidos(false)}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>}

                </View>)}
            {verPedidos && testing && <View style={styles.pedidosContainer}>
                {!listaPedidos.empty ? (
                    <FlatList
                        data={listaPedidos}
                        keyExtractor={(item) => item.id}
                        renderItem={renderPedido}
                    />
                ) : (
                    <Text>Nenhum item encontrado 😔</Text>
                )}
            </View>}
            {!testing && <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Entre ou faça um cadastro</Text>}
            {!testing &&
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput style={styles.input}
                        secureTextEntry
                        placeholder="Senha"
                        value={password}
                        onChangeText={(senha) => setPassword(senha)}
                    />
                    {!signin && !testing && <TouchableOpacity onPress={() => navigation.navigate("Home6")} style={{ alignSelf: 'center', marginTop: 15 }}>
                        <Text>Criar um Cadastro</Text>
                    </TouchableOpacity>}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setLogin(false)} style={styles.button}>
                            <Text style={styles.buttonTxt}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => logarContaTeste()}>
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
    pedidosContainer: {
        flexGrow: 1,
        backgroundColor: "#FAF8F8",
        fontFamily: "Roboto",
        paddingHorizontal: 10,
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
    buttonVerPedidos: {
        backgroundColor: "grey",
        alignSelf: "flex-start",
        padding: 4,
        marginLeft: 10,
        borderRadius: 5,
    },
    buttonDeletarConta: {
        backgroundColor: "red",
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
    imageContainer: {
        flex: 10,
        marginTop: 10,
    },
    imagemAvatar: {
        height: 90,
        width: 90,
        borderRadius: 40
    },
});
