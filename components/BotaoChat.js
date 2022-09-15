import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function BotaoChat({ navigation }) {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={navigation}
                style={styles.touchableOpacityStyle}>
                    
                <Image style={{ height: 50, width: 50, borderRadius: 20 }} source={require('../assets/avatar.jpg')} />

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    touchableOpacityStyle: {
        position: "absolute",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        right: 30,
        bottom: 10,
    },
    floatingButtonStyle: {
        resizeMode: "contain",
        width: 100,
        height: 100,
    },
});
