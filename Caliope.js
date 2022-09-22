import React, { useState, useEffect } from 'react'
import { Pressable, StatusBar, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';

import Conversation from './Conversation';
import MenuBar from './MenuBar';

import api from './api';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function Caliope({ navigation }) {

    const [sessionId, setSessionId] = useState('')
    const [audioEnviado, setAudioEnviado] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [mensagem, setMensagem] = useState({})
    const [resposta, setResposta] = useState([{}])
    const [conversa, setConversa] = useState([])

    const [boasVindas] = useState("Oi, eu sou Calíope. 🥰")

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
                        setResposta((resposta) => [...resposta, { mensagem: element.text, mensagemDoUsuario: false, imagem: false }])
                        setConversa((conversa) => [...conversa, { mensagem: element.text, mensagemDoUsuario: false, imagem: false }])
                    } else {
                        setConversa((conversa) => [...conversa, { mensagem: element.source, mensagemDoUsuario: false, imagem: true }])
                    }
                });

            }).then(setMensagem({}))
            .catch(error => console.log(error))
    }

    const ouvirResposta = () => {
        if (resposta.length <= 1) alert("Áudio indisponivel, manda um mensagem...")
        else {
            Tts.setDefaultLanguage('pt-BR');
            Tts.setDefaultRate(0.6);
            const texto = resposta[resposta.length - 1].mensagem;
            Tts.speak(texto);
        }
    };

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
        // console.log("AUDIO ENVIADO! ", audioEnviado)
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
                    <TouchableOpacity onPress={() => navigation.navigate("Home5")}>
                        <Image style={styles.menuBar} source={require('./assets/menu.jpg')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Home5")}>
                        <Image style={styles.avatar} source={require('./assets/avatar-menu.png')} />
                    </TouchableOpacity>
                </View>
                <ActivityIndicator color="tomato" size='large' animating={isLoading} />
                {!isLoading && <Conversation tipo={false}>{boasVindas}</Conversation>}
                <FlatList
                    data={conversa}
                    keyExtractor={(item, index) => `${item.mensagem} + ${index}`}
                    renderItem={({ item, index }) => (
                        <Conversation tipo={item.mensagemDoUsuario} img={item.imagem} key={index}>{item.mensagem}</Conversation>
                    )} />

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
                <View style={styles.clearField}>
                    <TouchableOpacity onPress={() => setConversa([])}>
                        <Text style={styles.clearChat}>Limpar conversa</Text>
                    </TouchableOpacity>
                </View>
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
        height:"auto",
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
        marginRight:10,
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
    avatar: {
        marginLeft: 20,
        marginTop: 8,
        width: 38,
        height: 38,
        tintColor: 'black',
    },
    menuContainer: {
        // paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
    },
});
