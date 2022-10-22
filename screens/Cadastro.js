import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from "react-native";

import { apiUsuario } from '../api'

export default function Cadastro({ navigation, route }) {

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [celular, setCelular] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    useEffect(() => {
        const getAllUsuarios = async () => {
            const response = await apiUsuario.get('/usuario')
            console.log("GET Status Code: ", response.status);
        }
        getAllUsuarios()
    }, [])

    const criarNovoUsuario = () => {
        if (nome == '' || cpf == '' || celular == '' || email == '' || senha == '') { return ToastAndroid.show("Um dos campos está vazio. Verifique e tente novamente.", ToastAndroid.SHORT) }
        else if (senha.length < 6) { return ToastAndroid.show("Senha inválida. Verifique e tente novamente.", ToastAndroid.SHORT) }
        else if (cpf.length < 11) { return ToastAndroid.show("CPF inválido. Verifique e tente novamente.", ToastAndroid.SHORT) }
        else if (!email.includes('@')) { return ToastAndroid.show("Email inválido. Verifique e tente novamente.", ToastAndroid.SHORT) }



        apiUsuario.post('/usuario', {
            "nome": nome,
            "cpf": cpf,
            "numeroCelular": celular,
            "email": email,
            "senha": senha
        })
            .then((response) => console.log(response.status == 200 ? 'Conta criada com sucesso!' : 'Verifique criação de nova conta...'))
            .then(ToastAndroid.show("Conta criada com sucesso!", ToastAndroid.SHORT))
            .then(navigation.goBack())
    }

    return (
        <View >
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Insira seus dados</Text>
                <TextInput style={styles.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={(nome) => setNome(nome)}
                />
                <TextInput style={styles.input}
                    placeholder="CPF"
                    value={cpf}
                    keyboardType={'numeric'}
                    onChangeText={(cpf) => setCpf(cpf)}
                />
                <TextInput style={styles.input}
                    placeholder="DDD + Celular"
                    value={celular}
                    keyboardType={'phone-pad'}
                    onChangeText={(celular) => setCelular(celular)}
                />
                <TextInput style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput style={styles.input}
                    secureTextEntry
                    placeholder="Senha"
                    value={senha}
                    onChangeText={(senha) => setSenha(senha)}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonTxt}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={criarNovoUsuario} >
                        <Text style={styles.buttonTxt}>Criar Cadastro</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#FAF8F8",
        // fontFamily: "Roboto",
        padding: 15,
    },
    title: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold',
    },
    inputContainer: {
        backgroundColor: "#FAF8F8",
        // fontFamily: "Roboto",
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: "#FAF8F8",
        paddingTop: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    buttonContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        marginBottom: 15,
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
    containerItemPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});