import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, } from 'react-native';

import Conversation from './Conversation';


import api from './api';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';

export default function App() {

    const [sessionId, setSessionId] = useState('')
    const [mensagem, setMensagem] = useState({
        tipo: true,
        mensagem: '',
        imagem: null
    })
    const [resposta, setResposta] = useState([{
        tipo: false,
        mensagem: '',
        imagem: null
    }])
    const [recording, setRecording] = useState('')
    const [results, setResults] = useState([])
    const [conversa, setConversa] = useState([])

    useEffect(() => {
        const destroyAudio = async () => {
            const response = await api.get('/api/session')
            setSessionId(response.data.session_id)
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
                        setResposta((resposta) => [...resposta, { mensagem: element.text, tipo: false, imagem: false }])
                        setConversa((conversa) => [...conversa, { mensagem: element.text, tipo: false, imagem: false }])
                        console.log("ELEMENT ", index, element)
                    } else {
                        setConversa((conversa) => [...conversa, { mensagem: element.source, tipo: false, imagem: true }])
                        console.log("IMAGEM  ===>>>", element.source)
                    }
                });

            }).then(setMensagem({ mensagem: '' }))
            .catch(error => console.log(error))
    }

    const ouvirResposta = () => {
        Tts.setDefaultLanguage('pt-BR');
        const texto = resposta[resposta.length - 1].mensagem;
        Tts.speak(texto);
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
        let text = e.value[0]
        // setResults(text)
        // setMensagem({ mensagem: text, tipo: true})      // TODO ----------> corrigir para objeto! 
        setRecording("audio gravado com sucesso.")
        console.log("speech result handler", e)
    }

    const startRecording = async () => {
        setRecording("gravando...")
        try {
            Voice.start('pt-Br')
        } catch (error) {
            console.log("error raised", error)
        }
    }

    const stopRecording = async () => {
        setRecording("gravacao parada.")
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
                {/* <View style={styles.conversation}>
                    {conversa.length > 0 ? (
                        conversa.map((resposta, index) => (
                            <Conversation key={index}>
                                {resposta}
                            </Conversation>
                        ))) : <Text>Nao há nada aqui...</Text>}
                </View> */}
                <FlatList
                    data={conversa}
                    keyExtractor={(item, index) => `${item.mensagem} + ${index}`}
                    renderItem={({ item, index }) => (
                        <Conversation tipo={item.tipo} img={item.imagem} key={index}>{item.mensagem}</Conversation>
                    )} />

                <View style={styles.textInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite aqui sua mensagem"
                        value={mensagem.mensagem}
                        onChangeText={(text) => setMensagem({ mensagem: text, tipo: true, imagem: false })} />

                </View>
                <View style={styles.icon}>
                    <TouchableOpacity onPress={mandarMensagem}>
                        <Text>Botão enviar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPressIn={startRecording}
                        onPressOut={stopRecording}>
                        <Text>Gravar voz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ouvirResposta}>
                        <Text>Ouvir resposta</Text>
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
        paddingRight: 15,
        paddingLeft: 10,
        paddingBottom: 15,
    },
    input: {
        flex: 6,
        borderBottomColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginRight: 10,
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
});