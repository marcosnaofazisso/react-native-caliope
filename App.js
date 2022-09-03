import React, { Component } from 'react'
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';

import api from './api';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';

export default class App extends Component {
    constructor(props) {
        super(props);

        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults.bind(this);

        this.state = {
            sessionId: "",
            mensagem: "Oi Naruto tudo bem",
            resposta1: "",
            resposta2: "",
            recording: "stoppped",
            recognized: "",
            result: "",

            results: [],
        }
    }

    async componentDidMount() {
        const response = await api.get('/api/session')
        this.setState({
            sessionId: response.data.result.session_id,
        })
        console.log("SESSION ID RESULT:", response.data.result.session_id);
        Voice.destroy().then(Voice.removeAllListeners);
    }

    mandarMensagem = () => {
        api.post('/api/message', {
            "session_id": this.state.sessionId,
            "input": {
                "message_type": "text",
                "text": this.state.mensagem
            }
        })
            .then(response => {
                console.log("RESPONSE 1:",
                    response.data.result.output.generic[1].text +
                    response.data.result.output.generic[2].text)
                this.setState({ resposta1: response.data.result.output.generic[1].text })
                this.setState({ resposta2: response.data.result.output.generic[2].text })

            })
            .catch(error => console.log(error))
    }

    ouvirResposta = () => {
        Tts.setDefaultLanguage('pt-BR');
        const texto = this.state.resposta2;
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
        this.setState({ recording: "audio parado com sucesso." })
    }

    onSpeechResults = (e) => {
        let text = e.value[0]
        this.setState({ results: text })
        this.setState({ recording: "audio gravado com sucesso." })
        console.log("speech result handler", e)
    }

    startRecording = async () => {
        this.setState({ recording: "gravando..." })
        try {
            Voice.start('pt-Br')
        } catch (error) {
            console.log("error raised", error)
        }
    }

    stopRecording = async () => {
        this.setState({ recording: "gravacao parada." })
        try {
            Voice.stop()
        } catch (error) {
            console.log("error raised", error)
        }
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.mainTitle}>Naruto App</Text>
                    <Text style={styles.title}>SESSION ID: {this.state.sessionId}</Text>
                    <Text style={styles.title}>Resposta: </Text>
                    <Text style={styles.title}>{this.state.resposta1}</Text>
                    <Text style={styles.title}>{this.state.resposta2}</Text>
                    <Text style={styles.title}>Recording: {this.state.recording}</Text>
                    <Text style={styles.title}>Result: {this.state.result}</Text>
                    <Text style={styles.title}>Results: {this.state.results}</Text>
                </View>
                <Pressable style={styles.button1} onPress={this.mandarMensagem.bind(this)}>
                    <Text style={styles.text}>Mandar mensagem para o Naruto</Text>
                </Pressable>

                <Pressable style={styles.button2} onPress={this.gravarVoz.bind(this)}>
                    <Text style={styles.text}>Gravar Voz</Text>
                </Pressable>

                <Button title='Start Speech to Text' onPress={this.startRecording.bind(this)} />
                <Button title='Stop Speech to Text' onPress={this.stopRecording.bind(this)} />
                <Pressable style={styles.button3} onPress={this.ouvirResposta.bind(this)}>
                    <Text style={styles.text}>Ouvir resposta</Text>
                </Pressable>
            </>
        )

    }
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
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: 'white',
    }
});