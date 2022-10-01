import React, { useState, useEffect, useContext } from 'react'
import { Pressable, StatusBar, StyleSheet, Text, ToastAndroid, View, TouchableOpacity, TextInput, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';

import Conversation from './Conversation';

import api from './api';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);


import { UsuarioContext } from './context/usuario-context';

import { fotosDosUsuariosTeste } from './data/fotosUsuarios';



import { CarrinhoContext } from './context/carrinho-context';
import { inventario, carrinho } from "./data/data";


export default function Caliope({ navigation }) {


    const { user } = useContext(UsuarioContext)
    const { addItemAoCarrinho } = useContext(CarrinhoContext);

    const [listaInventario] = useState(inventario);

    const [sessionId, setSessionId] = useState('')
    const [audioEnviado, setAudioEnviado] = useState(false)


    const [mensagem, setMensagem] = useState({})
    const [resposta, setResposta] = useState([{}])
    const [conversa, setConversa] = useState([{ mensagem: 'Oi, eu sou Calíope. 🥰', mensagemDoUsuario: false, imagem: false }])

    const [mostrarBoasVindas, setMostrarBoasVindas] = useState(true)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const destroyAudio = async () => {
            const response = await api.get('/api/session')
            setSessionId(response.data.session_id)
            setIsLoading(false)
            console.log("GET Status Code: ", response.status);
            console.log("SESSION ID: ", response.data.session_id);
        }
        destroyAudio()
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])

    useEffect(() => {
        if (user.nome) {
            setConversa([
                { mensagem: 'Oi, eu sou Calíope. 🥰', mensagemDoUsuario: false, imagem: false },
                { mensagem: `Te desejo boas vindas, ${user.nome}. Como posso te ajudar?`, mensagemDoUsuario: false, imagem: false },
            ])
        }
    }, [])

    const mandarMensagem = () => {
        api.post('/api/message', {
            "session_id": sessionId,
            "input": {
                "message_type": "text",
                "text": mensagem.mensagem
            }
        })
            .then(response => {
                setConversa((conversa) => [...conversa, mensagem])
                response.data.output.generic.forEach((element, index) => {
                    if (!element.source) {
                        if (element.text == 'Item adicionado ao carrinho! Para finalizar a compra, acesse o carrinho pelo aplicativo, tudo bem? ') {
                            adicionarItemAoCarrinho()
                        }
                        setResposta((resposta) => [...resposta, { mensagem: element.text, mensagemDoUsuario: false, imagem: false }])
                        setConversa((conversa) => [...conversa, { mensagem: element.text, mensagemDoUsuario: false, imagem: false }])
                    } else {
                        setConversa((conversa) => [...conversa, { mensagem: element.source, mensagemDoUsuario: false, imagem: true }])
                    }
                });

            }).then(setMensagem({}))
            .catch(error => console.log(error))
    }

    const adicionarItemAoCarrinho = () => {
        addItemAoCarrinho(listaInventario[2])

    }



    const ouvirResposta = () => {
        if (resposta.length <= 1) ToastAndroid.show("Áudio indisponível. Mande uma mensagem para começar...", ToastAndroid.SHORT);
        else {
            Tts.setDefaultLanguage('pt-BR');
            Tts.setDefaultRate(0.6);
            const texto = resposta[resposta.length - 1].mensagem;
            Tts.speak(texto);
        }
    };

    const limparConversa = () => {
        setMostrarBoasVindas(false)
        setConversa([])
    }

    const onSpeechRecognized = (e) => {
        console.log("recogninzed", e)
    }

    const onSpeechStart = (e) => {
        console.log("start handler==>>>", e)
    }

    const onSpeechEnd = (e) => {
        console.log("stop handler", e)
    }

    const onSpeechResults = (e) => {
        let text = e.value[e.value.length - 1]
        setMensagem({ mensagem: text, mensagemDoUsuario: true, imagem: false }),
            setAudioEnviado(current => !current),
            console.log("speech result handler", e)
    }

    useEffect(() => {
        console.log("Carregando....")
        mandarMensagem()
    }, [audioEnviado])

    const startRecording = async () => {
        try {
            Voice.start('pt-Br')
        } catch (error) {
            console.log("error raised", error)
        }
    }

    const stopRecording = async () => {
        try {
            Voice.stop()
        } catch (error) {
            console.log("error raised", error)
        }
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;


    return (
        <>
            <View style={styles.container}>
                <StatusBar style="light" backgroundColor="black" />
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                        <Image style={styles.menuBar} source={require('./assets/menu.jpg')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                        <Image style={styles.avatar} source={fotosDosUsuariosTeste[user.email] ? fotosDosUsuariosTeste[user.email] : fotosDosUsuariosTeste['avatarPadrao']} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
                        <Image style={styles.carrinho} source={require('./assets/carrinho.png')} />
                    </TouchableOpacity>
                </View>
                {isLoading && <ActivityIndicator color="tomato" size='large' animating={isLoading} />}
                {!isLoading &&
                    <FlatList
                        data={conversa}
                        keyExtractor={(item, index) => `${item.mensagem} + ${index}`}
                        renderItem={({ item, index }) => (
                            <View>
                                <Conversation tipo={item.mensagemDoUsuario} img={item.imagem} key={index}>{item.mensagem}</Conversation>
                            </View>
                        )} />}

                <View style={styles.textInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui sua mensagem"
                        value={mensagem.mensagem}
                        onChangeText={(text) => setMensagem({ mensagem: text, mensagemDoUsuario: true, imagem: false })} />
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={mandarMensagem}>
                            <Image style={styles.sendIcon} source={require('./assets/send.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPressIn={startRecording}
                            onPressOut={stopRecording}>
                            <Image style={styles.microphoneIcon} source={require('./assets/microphone.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ouvirResposta}>
                            <Image style={styles.listenIcon} source={require('./assets/listen.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                {conversa.length > 1 ?
                    <View style={styles.clearField}>
                        <TouchableOpacity onPress={limparConversa}>
                            <Text style={styles.clearChat}>Limpar conversa</Text>
                        </TouchableOpacity>
                    </View> : null}
            </View>
            <View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: "#fff",
    },
    conversation: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    baloonContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    baloon: {
        margin: 10,
        padding: 6,
        backgroundColor: "black",
        color: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    textInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        paddingTop: 15, // original value: not existed
        paddingRight: 90, //original value: 15
        paddingLeft: 15, //original value: 10
        paddingBottom: 15,
    },
    input: {
        flex: 6,
        height: "auto",
        borderBottomColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginRight: 10,
        backgroundColor: "#FFF",

    },
    icon: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    mainTitle: {
        fontFamily: 'Roboto',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'white',
    },
    microphoneIcon: {
        color: 'black',
        marginLeft: 10,
        marginRight: 10,
        width: 35,
        height: 35,
    },
    sendIcon: {
        color: 'black',
        marginRight: 5,
        width: 35,
        height: 35,
    },
    listenIcon: {
        color: 'black',
        marginRight: 3,
        width: 35,
        height: 35,
    },
    clearField: {
        alignItems: "center",
        backgroundColor: "#F5F5F5",

    },
    clearChat: {
        fontWeight: 'bold',
        marginBottom: 15,
    },
    menuBar: {
        width: 38,
        height: 38,
        tintColor: 'black',
        marginLeft: 10,
        marginTop: 10,
    },
    carrinho: {
        width: 20,
        height: 20,
        marginLeft: 240,
        marginTop: 8,
    },
    avatar: {
        marginLeft: 20,
        marginTop: 8,
        width: 42,
        height: 42,
        borderRadius: 40

    },
    menuContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 0,
    },
});
