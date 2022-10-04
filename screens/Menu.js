import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, FlatList, SafeAreaView, Image, Alert, TextInput } from "react-native";

import Pedido from "./Pedido";

import { fotosDosUsuariosTeste } from "../data/fotosUsuarios";
import { apiUsuario } from "../api";


import { UsuarioContext } from "../context/usuario-context";


export default function Menu({ navigation }) {


    const { user, isLoggedIn, signIn, signOut } = useContext(UsuarioContext)

    const [email, setEmail] = useState("cristine@caliope.com.br");
    const [password, setPassword] = useState("123456789");


    const [verPedidos, setVerPedidos] = useState(false);
    const [listaDeUsuarios, setListaDeUsuarios] = useState([]);

    const [renderizarPagina, setRenderizarPagina] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    const [recoverPassword, setRecoverPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');



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
        console.log("Deslogando usuario....")
        setRecoverPassword(false)
        setVerPedidos(false)
        signOut()

    }


    function renderPedido(data) {
        const item = data.item;
        const pedidoItem = {
            id: item.id,
            numeroPedido: item.numeroPedido,
            dataPedido: item.data,
            totalItems: item.quantidadeItems,
            valorTotal: item.valorTotal
        }

        return (
            <Pedido {...pedidoItem} />
        )

    }

    useEffect(() => {
        if (!isLoggedIn && isLoading) {
            const getAllUsuarios = async () => {
                const response = await apiUsuario.get('/usuario')
                setListaDeUsuarios(response.data)
                console.log("GET Status Code: ", response.status);
                console.log("Response Data: ", JSON.stringify(response.data));
            }
            getAllUsuarios()
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        console.log("Recarregando...")
        console.log("Existe usuário logado? =>", isLoggedIn)
        setRenderizarPagina(current => !current)
    }, [isLoggedIn])

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
                "senha": novaSenha,
                "pedidos": usuario.pedidos
            })
            console.log("PUT Status Code:", response.status)
            ToastAndroid.show("Senha alterada com sucesso!", ToastAndroid.SHORT)
            setRecoverPassword(false)
        }

    }



    const PerfilUsuario = () => (
        <View>
            <View style={styles.ViewMenu}>
                <Text style={styles.textName}>{user.nome}</Text>
                <Text style={styles.textStyle}>{user.numeroCelular}</Text>
                <Text style={styles.textStyle}>{user.email}</Text>
            </View>

            <View style={styles.View}>
                {!verPedidos &&
                    <TouchableOpacity style={styles.buttonPedido} onPress={() => setVerPedidos(true)}>
                        <Text style={styles.buttonTxt}>Ver Meus Pedidos</Text>
                    </TouchableOpacity>}

                <TouchableOpacity onPress={() => deletarConta(user.id)} style={styles.buttonDeletarConta}>
                    <Text style={styles.buttonTxt}>Deletar Conta</Text>
                </TouchableOpacity>

                {!recoverPassword && <TouchableOpacity style={styles.buttonPedido} onPress={() => setRecoverPassword(true)}>
                    <Text style={styles.buttonTxt}>Alterar Senha</Text>
                </TouchableOpacity>}

                <TouchableOpacity style={styles.buttonSair} onPress={() => deslogarContaTeste()}>
                    <Text style={styles.buttonTxt}>Sair</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ViewSetSenha}>
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
                            <TouchableOpacity style={styles.buttonAletarSenha} onPress={() => alterarSenha(user, newPassword, confirmedNewPassword)} styles={styles.button}>
                                <Text style={styles.buttonTxt}>Alterar Senha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </View>
    )

    return (
        <>
            {isLoading ? <SafeAreaView style={styles.safeArea}>
                <ActivityIndicator color="tomato" size='large' animating={isLoading} />
            </SafeAreaView>
                :
                <SafeAreaView style={styles.safeArea}>

                    {isLoggedIn ?
                        <View style={styles.container}>
                            <Image style={styles.imagemAvatar}
                                source={fotosDosUsuariosTeste[user.email] ? fotosDosUsuariosTeste[user.email] : fotosDosUsuariosTeste['avatarPadrao']} />

                            <PerfilUsuario />

                        </View>
                        :
                        <View style={styles.container}>
                            <Image style={styles.imagemAvatar} source={fotosDosUsuariosTeste[email] ? fotosDosUsuariosTeste[email] : fotosDosUsuariosTeste['avatarPadrao']} />
                        </View>}

                    {verPedidos && <View style={styles.pedidosContainer}>
                        <Text style={{ fontWeight: 'bold', marginTop: 15, marginBottom: 10, alignSelf: 'center' }}>Meus Pedidos</Text>
                        {!user.pedidos.empty ? (
                            <FlatList
                                data={user.pedidos}
                                keyExtractor={(item) => item.id}
                                renderItem={renderPedido}
                            />
                        ) : (
                            <Text>Nenhum item encontrado 😔</Text>
                        )}
                        <TouchableOpacity onPress={() => setVerPedidos(false)} style={{ alignSelf: 'center', marginBottom: 10, }}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>}
                    {!isLoggedIn &&
                        <View style={styles.inputContainer}>
                            <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Entre ou faça um cadastro</Text>
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
                            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} style={{ alignSelf: 'center', marginTop: 15 }}>
                                <Text>Criar um Cadastro</Text>
                            </TouchableOpacity>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                                    <Text style={styles.buttonTxt}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => logarContaTeste()}>
                                    <Text style={styles.buttonTxt}>Entrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                </SafeAreaView>}
        </>
    )
}
const styles = StyleSheet.create({
    ViewMenu: {
        width: "100%",
        textAlign: "left",
        paddingLeft: 10,
    },
    textStyle: {
        fontSize: 16,
        color: "#212121",
        marginBottom: 2,
    },
    textName: {
        fontSize: 16,
        color: "#212121",
        marginBottom: 2,
        fontWeight: "bold",
        textDecorationL: "overline",
    },
    container: {
        flex: 2,
        width: "100%",
        backgroundColor: "#FAF8F8",
        fontFamily: "Roboto",
        alignItems: 'center',
        paddingTop: 20,
    },
    safeArea: {
        flex: 2,
        height: "auto",
        overflowy: "auto",
        width: "100%",
    },
    pedidosContainer: {
        flex: 3,
        height: "auto",
        width: "100%",
        overflow: "scroll",
        backgroundColor: "#FAF8F8",
        paddingRight: 15,
    },
    View: {
        marginTop: 5,
        paddingRight: 10,
        flexDirection: "row",
    },
    ViewSetSenha: {
        flexDirection: "column",
        flex: 1,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },
    inputContainer: {
        backgroundColor: "#FAF8F8",
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
    buttonAletarSenha: {
        backgroundColor: "#42d66a",
        alignSelf: "flex-start",
        padding: 4,
        marginLeft: 10,
        borderRadius: 5,
    },
    buttonPedido: {
        backgroundColor: "grey",
        alignSelf: "flex-start",
        padding: 4,
        marginLeft: 10,
        borderRadius: 5,
    },
    buttonSair: {
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
        paddingBottom: 100,
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
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        borderColor: '#252525',
        borderWidth: 2,
    },
});
