import { Text, View, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";

import BotaoChat from "../components/BotaoChat";
import RoupaInfo from "../components/RoupaInfo";

export default function RoupaInfos({ navigation, route }) {

  function onPressNavigation() {
    navigation.navigate("Carrinho");
  }

  const produtoSelecionado = {
    id: route.params.id,
    title: route.params.title,
    price: route.params.price,
    photo: route.params.photo,
    description: route.params.description,
    discount: route.params.discount,
    type: route.params.type
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Informações do Produto</Text>
      <RoupaInfo {...produtoSelecionado} onPress={onPressNavigation} />
      <BotaoChat navigation={() => navigation.navigate("Caliope")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAF8F8",
    paddingRight: 5,
    paddingLeft: 5,
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
