import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, TouchableOpacity, Button, FlatList, SafeAreaView, Image, TextInput } from "react-native";

export default function Menu({ navigation, route }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [login, setLogin] = useState(false);
    const [signin, setSignIn] = useState(false);

    return (
        <SafeAreaView>
            {!isLoggedIn &&
                (<View style={styles.container}>
                    <Text>Você está logado anonimamente, para comprar entre ou faça um cadastro.</Text>
                    <Image style={{ height: 90, width: 90 }} source={require('../assets/avatar-menu.png')} />
                    <View style={styles.signOrLoginContainer}>
                        {!login && <TouchableOpacity onPress={() => setLogin(true)}>
                            <Text>Entrar</Text>
                        </TouchableOpacity>}
                        {!signin && <TouchableOpacity onPress={() => setSignIn(true)}>
                            <Text>Cadastrar</Text>
                        </TouchableOpacity>}
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
                        onChangeText={(senha) => setSenha(senha)}
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
