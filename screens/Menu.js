import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, FlatList, SafeAreaView, Image, Alert, TextInput } from "react-native";

import Pedido from "./Pedido";

import { listaPedidos } from "../data/listaPedidos";
import { fotosDosUsuariosTeste } from "../data/fotosUsuarios";
import { apiUsuario } from "../api";


import { UsuarioContext } from "../context/usuario-context";


export default function Menu({ navigation, route }) {


    const { user, isLoggedIn, signIn, signOut } = useContext(UsuarioContext)


    const [recoverPassword, setRecoverPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

    const [email, setEmail] = useState("cristine@caliope.com.br");
    const [password, setPassword] = useState("123456789");

    const [signin, setSignIn] = useState(false);
    const [verPedidos, setVerPedidos] = useState(false);

    const [listaDeUsuarios, setListaDeUsuarios] = useState([]);




    function logarContaTeste() {
        let existeCadastro = false
        for (let i = 0; i < listaDeUsuarios.length; i++) {
            if (listaDeUsuarios[i].email === email && listaDeUsuarios[i].senha === password) {
                console.log('Logando usuario...')
                signIn(listaDeUsuarios[i])
                existeCadastro = true
                break
            }
        }
        if (!existeCadastro) {
            Alert.alert("Dados inválidos.", "Por favor, verifique os dados inseridos e tente novamente.")
        }

    }
    function deslogarContaTeste() {
        signOut()

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
            <Text>{user.nome}</Text>
            <Text>{user.numeroCelular}</Text>
            <Text>{user.email}</Text>
            <Text></Text>
            {!verPedidos &&
                <TouchableOpacity onPress={() => setVerPedidos(true)}>
                    <Text >Ver Meus Pedidos</Text>
                </TouchableOpacity>}
            <Text></Text>
            <TouchableOpacity onPress={() => deletarConta(user.id)} style={styles.buttonDeletarConta}>
                <Text style={styles.buttonTxt}>Deletar Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deslogarContaTeste()}>
                <Text>Sair</Text>
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
                        <TouchableOpacity onPress={() => alterarSenha(user, newPassword, confirmedNewPassword)} style={styles.button}>
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
                    {<Text>Você está logado anonimamente, para comprar entre ou faça um cadastro.</Text>}
                    <Image style={styles.imagemAvatar} source={fotosDosUsuariosTeste[email] ? fotosDosUsuariosTeste[email] : fotosDosUsuariosTeste['avatarPadrao']} />

                    {verPedidos &&
                        <View>
                            <Text style={{ fontWeight: 'bold', marginTop: 15, marginBottom: 10 }}>Meus Pedidos</Text>
                            <TouchableOpacity onPress={() => setVerPedidos(false)}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>}

                </View>)}
            {isLoggedIn &&
                (<View style={styles.container}>
                    <Image style={styles.imagemAvatar} source={fotosDosUsuariosTeste[user.email] ? fotosDosUsuariosTeste[user.email] : fotosDosUsuariosTeste['avatarPadrao']} />

                    <PerfilUsuario />

                    {verPedidos &&
                        <View>
                            <Text style={{ fontWeight: 'bold', marginTop: 15, marginBottom: 10 }}>Meus Pedidos</Text>
                            <TouchableOpacity onPress={() => setVerPedidos(false)}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>}

                </View>)}
            {verPedidos && <View style={styles.pedidosContainer}>
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
            {!isLoggedIn && <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Entre ou faça um cadastro</Text>}
            {!isLoggedIn &&
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
                    {!signin && <TouchableOpacity onPress={() => navigation.navigate("Home6")} style={{ alignSelf: 'center', marginTop: 15 }}>
                        <Text>Criar um Cadastro</Text>
                    </TouchableOpacity>}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
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
