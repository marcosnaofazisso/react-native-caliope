import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Conversation(props) {
  
    const stylesConversation = [];
    if (props.tipo) {
      stylesConversation.push(styles.baloonUsuario);
    }else {
      stylesConversation.push(styles.baloonBot);
    }

  return (
    <View style={styles.baloonContainer}>
      {!props.img && <View style={styles.text}>
        <Text style={stylesConversation} >{props.children}</Text>
      </View>}
      {props.img && <View style={styles.imgContainer}>
        <Image style={styles.imagem} source={{uri:props.children,}} />
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  baloonContainer: {
    // flexDirection: "row-reverse",
  },
  imgContainer: {
    flexDirection: "row-reverse",
  },
  text:{
    flexDirection: "row-reverse",
  },
  baloonBot: {
    margin: 10,
    padding: 6,
    backgroundColor: "black",
    color: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  baloonUsuario: {
    margin: 10,
    padding: 6,
    backgroundColor: "green",
    color: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  imagem:{
    resizeMode: 'center',
    width: 200,
    height: 200
  }
});
