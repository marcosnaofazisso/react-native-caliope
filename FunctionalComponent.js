import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import api from './api';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';

export default function App() {

    const [sessionId, setSessionId] = useState('')
    const [mensagem, setMensagem] = useState('Oi Naruto tudo bem')
    const [resposta1, setResposta1] = useState('')
    const [resposta2, setResposta2] = useState('')
    const [recording, setRecording] = useState('')
    const [results, setResults] = useState([])

    
    useEffect(() => {
        const destroyAudio = async() => {
            const response = await api.get('/api/session')
            setSessionId(response.data.result.session_id)
            console.log("SESSION ID RESULT:", response.data.result.session_id);
        }
        destroyAudio() 
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
      }, [])

    mandarMensagem = () => {
        api.post('/api/message', {
            "session_id": sessionId,
            "input": {
                "message_type": "text",
                "text": mensagem
            }
        })
            .then(response => {
                console.log("RESPONSE 1:",
                    response.data.result.output.generic[1].text +
                    response.data.result.output.generic[2].text)
                setResposta1(response.data.result.output.generic[1].text)
                setResposta2(response.data.result.output.generic[2].text)

            })
            .catch(error => console.log(error))
    }

    ouvirResposta = (e) => {
        Tts.setDefaultLanguage('pt-BR');
        const texto = resposta2;
        Tts.speak(texto);
    };

    onSpeechRecognized = (e) => {
        console.log("recogninzed", e)
    }

    onSpeechStart = (e) => {
        console.log("start handler==>>>", e)
    }
    onSpeechEnd = (e) => {
        console.log("stop handler", e)
    }

    onSpeechResults = (e) => {
        let text = e.value[0]
        setResults(text)
        setRecording("audio gravado com sucesso.")
        console.log("speech result handler", e)
    }

    startRecording = async () => {
        setRecording("gravando...")
        try {
            Voice.start('pt-Br')
        } catch (error) {
            console.log("error raised", error)
        }
    }

    stopRecording = async () => {
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
                <Text style={styles.mainTitle}>Naruto App</Text>
                <Text style={styles.title}>SESSION ID: {sessionId}</Text>
                <Text style={styles.title}>Resposta: </Text>
                <Text style={styles.title}>{resposta1}</Text>
                <Text style={styles.title}>{resposta2}</Text>
                <Text style={styles.title}>Recording: {recording}</Text>
                <Text style={styles.title}>Results: {results}</Text>
            </View>
            <Pressable style={styles.button1} onPress={mandarMensagem}>
                <Text style={styles.text}>Mandar mensagem para o Naruto</Text>
            </Pressable>

            <TouchableOpacity style={styles.button2}
                    activeOpacity={0.9}
                    onPressIn={startRecording}
                    onPressOut={stopRecording}
                    >
                        <Text>APERTE</Text>
                    </TouchableOpacity>

            <Pressable style={styles.button2} onPress={ouvirResposta}>
                <Text style={styles.text}>Ouvir resposta</Text>
            </Pressable>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECF0F1',
        margin: 10
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
    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 5,
        backgroundColor: 'orange',
        marginTop: 1,

    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 5,
        backgroundColor: 'cyan',
        marginTop: 1,

    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'white',
    }
});