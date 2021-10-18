import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function Buy(props) {
  const { product, quantity } = props;
  const addProductCart = () => {
    console.log("Producto agregado al carrito");
    console.log(product.title);
    console.log("Cantidad: " + quantity);
  };
  return (
    <View>
      <Button
        mode="contained"
        contentStyle={styles.btnBuyContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={addProductCart}
      >
        Añadir al carrito
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
