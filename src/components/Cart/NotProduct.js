import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
export default function NotProduct() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        No tienes productos en el carrito, intenta realizar una búsqueda y
        agrega productos para continuar
      </Text>
      <View>
        <AwesomeIcon name="shopping-cart" style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#696969",
  },
  icon: {
    fontSize: 100,
    alignItems: "center",
    color: "#696969",
    height: 200,
    marginBottom: 20,
  },
});
