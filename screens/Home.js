import React, { useState, useEffect, Component, PropTypes } from "react";
import {
    AppState,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Button
} from "react-native";


import RoupaBox from '../components/RoupaBox.js'
import { NEWROUPAS } from "../data/data.js";

import BotaoChat from "../components/BotaoChat.js";

export default function Home({ navigation }) {
    const [state, setState] = useState({
        tops: false,
        bottoms: false,
        empty: false,
    });

    const [renderizarPagina, setRenderizarPagina] = useState(false)
    const [appState, setAppState] = useState(AppState.currentState);
    var eventListenerSubscription;

    const _handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === "active") {
            console.log("App has come to the foreground!");
        }
        setAppState(nextAppState);
    };

    useEffect(() => {
        //on mount
        eventListenerSubscription = AppState.addEventListener(
            "change",
            _handleAppStateChange
        );
        return () => {
            // on unmount
            eventListenerSubscription.remove();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRenderizarPagina(current => !current)
        });
        return unsubscribe;
    }, []);




    const renderRoupa = (itemData) => {
        const item = itemData.item;
        const roupaItemProps = {
            id: item.id,
            title: item.title,
            photo: item.photo,
            price: item.price,
            description: item.description,
            discount: item.discount,
            type: item.type,
        };

        function pressHandler() {
            navigation.navigate("Home2", { ...roupaItemProps });
        }

        if (roupaItemProps.type === "tops" && state.tops) {
            return <RoupaBox {...roupaItemProps} onPress={pressHandler} />;
        }

        if (state.bottoms) {
            if (roupaItemProps.type === "bottoms") {
                return <RoupaBox {...roupaItemProps} onPress={pressHandler} />;
            } else {
                setState({ empty: true });
                return null;
            }
        }

        if (!state.tops && !state.bottoms) {
            return <RoupaBox {...roupaItemProps} onPress={pressHandler} />;
        }
    };






    onPressTops = () => {
        setState({ tops: true, bottoms: false, empty: false });
    };

    onPressBottoms = () => {
        setState({ bottoms: true, tops: false, empty: false });
    };

    onPressAll = () => {
        setState({ tops: false, bottoms: false, empty: false });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerTops} onPress={onPressAll}>
                    <Text>ALL</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity style={styles.headerTops} onPress={onPressTops}>
                    <Text>TOPS</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity style={styles.headerBotton} onPress={onPressBottoms}>
                    <Text>BOTTONS</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                {!state.empty ? (
                    <FlatList
                        data={NEWROUPAS}
                        keyExtractor={(item) => item.id}
                        renderItem={renderRoupa}
                    />
                ) : (
                    <Text>Nenhum item encontrado 😔</Text>
                )}
            </View>
            <BotaoChat onPress={() => navigation.navigate('Caliope')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#FAF8F8",
        // fontFamily: "Roboto",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        fontSize: 18,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        marginHorizontal: 40,
    },
    headerTops: {
        marginHorizontal: 10,
    },
    headerBotton: {
        marginLeft: 10,
    },
    imageContainer: {
        flex: 10,
        marginTop: 10,
    },
});
