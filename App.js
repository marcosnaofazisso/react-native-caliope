import { Pressable, StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react'
import api from './api';
import { PERMISSIONS } from 'react-native-permissions';

import Voice from '@react-native-community/voice';

const App = () => {
    const [sessionId, setSessionId] = useState('');
    const [mensagem, setMessage] = useState('Oi Naruto tudo bem');
    const [resposta1, setResposta1] = useState('');
    const [resposta2, setResposta2] = useState('');
    const [results, setResults] = useState([]);
    const [started, setStarted] = useState('');
    const [recognized, setRecognized] = useState('');
    const [permission, setPermission] = useState('');

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
                    response.data.result.output.generic[2].text);
                setResposta1(response.data.result.output.generic[1].text);
                setResposta2(response.data.result.output.generic[2].text);

            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        const getSessionId = async () => {
            const response = await api.get('/api/session')
            setSessionId(response.data.result.session_id);
            console.log('SESSION ID RESULT:', response.data.result.session_id);
        }
        getSessionId()
    }, [])


    // ouvirResposta = () => {
    //     const texto = this.state.resposta2;
    //     Speech.speak(texto, {
    //         language: "pt-BR"
    //     });
    // };

    useEffect(() => {
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, []);

    const startSpeechToText = async () => {
        try {
            setStarted('gravando...');
            await Voice.start('en-US', {
                RECOGNIZER_ENGINE: 'GOOGLE',
                EXTRA_PARTIAL_RESULTS: true,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const stopSpeechToText = async () => {
        try {
            setStarted('gravacao parada');
            await Voice.stop();
        } catch (error) {
            console.error(error);
        }
    }

    const onSpeechResults = (result) => {
        console.log("RES =====>", result);
        console.log("RES VALUE ====> ", result.value);
        setResults(result.value);
    }

    const onSpeechError = (error) => {
        console.log(error);
    }

    const requestAudioPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the audio");
                setPermission('autorizado')
            } else {
                setPermission('nãp autorizado')
                console.log("Audio permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }


    return (
        <>
            <View style={styles.container}>
                <Text style={styles.mainTitle}>Naruto App</Text>
                <Text style={styles.title}>SESSION ID: {sessionId}</Text>
                <Text style={styles.title}>Resposta: </Text>
                <Text style={styles.title}>{resposta1}</Text>
                <Text style={styles.title}>{resposta2}</Text>
                <Pressable style={styles.button1} onPress={mandarMensagem}>
                    <Text style={styles.text}>Gerar nova Resposta</Text>
                </Pressable>


                <Text style={styles.title}>Permission: {permission}</Text>
                <Button title="request permissions" onPress={requestAudioPermission} />


                <Text style={styles.title}>Started: {started}</Text>
                <Button title='Start Speech' onPress={startSpeechToText} />
                <Button title='Stop Speech' onPress={stopSpeechToText} />
            </View>
        </>
    )
};


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
});

export default App;
