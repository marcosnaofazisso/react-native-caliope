import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Avatar, Icon } from "react-native-elements";



export default function MenuBar() {
    return (
        <View style={styles.container}>
            {/* <View> */}
                <Image style={styles.menuBar} source={require('./assets/menu.jpg')} />
            {/* </View> */}
                <Image style={styles.avatar} source={require('./assets/avatar-menu.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "black",
    },
    menuBar: {
        width: 50,
        height: 50,
        tintColor:'white',
    },
    avatar: {
        marginLeft: 20,
        width: 30,
        height: 30,
        tintColor:'white',
    },
});
