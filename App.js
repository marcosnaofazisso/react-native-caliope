import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, Component } from 'react'
import api, { apiServer } from './api';

import Voice from '@react-native-community/voice';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionId: '',
            mensagem: 'Oi Naruto tudo bem',
            resposta1: '',
            resposta2: '',
            results: [],
            started: '',
            recognized: '',
        }
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

    transformarVozEmTexto = () => {
        apiServer.get('/api/speech-to-text/token/').then((response) => {
            return response.json();
        })
            .then(function (token) {
                console.log('TOKEN: ', token)

                var stream = recognizeMic(Object.assign(token, {
                    objectMode: true, // send objects instead of text
                    format: false // optional - performs basic formatting on the results such as capitals an periods
                }));

                stream.on('data', function (data) {
                    console.log(data);
                });

                stream.on('error', function (err) {
                    console.log(err);
                });

                document.querySelector('#stop').onclick = stream.stop.bind(stream);

            }).catch(function (error) {
                console.log(error);
            });
    }

    // ouvirResposta = () => {
    //     const texto = this.state.resposta2;
    //     Speech.speak(texto, {
    //         language: "pt-BR"
    //     });
    // };


    // useEffect = (() => {


    //     return () => {
    //         Voice.destroy().then(Voice.removeAllListeners);
    //     }
    // }, []);

    async componentDidMount() {
        const response = await api.get('/api/session')
        this.setState({
            sessionId: response.data.result.session_id,
        })

        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);

        console.log('SESSION ID RESULT:', response.data.result.session_id);
    }

    onSpeechStart(e) {
        this.setState({started: e,})
    }
    onSpeechResults(e) {
        this.setState({results: e.value})
    }
    onSpeechRecognized(e) {
        this.setState({recognized: e,})
    }
    
    async startSpeechToText(e) {
        this.setState({results: [],
                        recognized: e,})
        try {
            await Voice.start('en-US');
            
        } catch(error) { 
            console.log('Esse e o erro ===>>>', error)
        }
    };

    stopSpeechToText = async () => {
        await Voice.stop();
    };

    // onSpeechResults = (result) => {
    //     this.setState({results: result.value});
    // };

    onSpeechError = (error) => {
        console.log(error);
    };

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.mainTitle}>Naruto App</Text>
                    {/* Aqui temos o Session ID que é obtido quando o app renderiza, com o componentDidMount */}
                    <Text style={styles.title}>SESSION ID: {this.state.sessionId}</Text>
                    {/* Aqui temos a resposta que é obtida através do método POST quando acionada na função mandarMensagem*/}
                    <Text style={styles.title}>Resposta: </Text>
                    <Text style={styles.title}>{this.state.resposta1}</Text>
                    <Text style={styles.title}>{this.state.resposta2}</Text>
                </View>
                <Pressable style={styles.button1} onPress={this.mandarMensagem.bind(this)}>
                    <Text style={styles.text}>Mandar mensagem para o Naruto</Text>
                </Pressable>


                <Button title='Start Speech to Text' onPress={this.startSpeechToText.bind(this)} />
                <Button title='Stop Speech to Text' onPress={this.stopSpeechToText.bind(this)} />
                {/* <Pressable style={styles.button3} onPress={this.ouvirResposta.bind(this)}>
                    <Text style={styles.text}>Ouvir resposta</Text>
                </Pressable> */}
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
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 5,
        backgroundColor: 'red',
        marginTop: 1,

    },
    button3: {
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
})
    ;