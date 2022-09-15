import { Text, View, StyleSheet } from "react-native";
import React, { useContext } from "react";

import BotaoChat from "../components/BotaoChat";
import RoupaInfo from "../components/RoupaInfo";

import { NEWROUPAS, NEWROUPAS2 } from "../data/data";

export default function RoupaInfos({ navigation, route }) {

  function onPressNavigation() {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    var index = NEWROUPAS.map((x) => {
      return x.id;
    }).indexOf(route.params.id);
    NEWROUPAS2.push(NEWROUPAS[index]);
    NEWROUPAS.splice(index, 1);
    console.log("index:", index);

  }

  const nome = {
    id: route.params.id,
    title: route.params.title,
    price: route.params.price,
    photo: route.params.photo,
    description: route.params.description,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Informações do Produto</Text>
      <RoupaInfo {...nome} onPress={onPressNavigation} />
      <BotaoChat navigation={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAF8F8",
    // fontFamily: "Roboto",
  },
  button: {
    backgroundColor: "black",
    alignSelf: "flex-start",
    padding: 4,
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonTxt: {
    color: "white",
  },
  info: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
});
