import React from "react";
import { StyleSheet, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { addProductCartApi } from "../../api/cart";

export default function Buy(props) {
  const { product, quantity } = props;

  const addProductCart = async () => {
    const response = await addProductCartApi(product.slug, quantity);
    if (response) {
      Toast.show("Producto añadido al carrito", {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show("Error al añadir el producto al carrito", {
        position: Toast.positions.CENTER,
      });
    }
  };
  return (
    <View>
      <RootSiblingParent>
        <Button
          mode="contained"
          contentStyle={styles.btnBuyContent}
          labelStyle={styles.btnLabel}
          style={styles.btn}
          onPress={addProductCart}
        >
          Añadir al carrito
        </Button>
      </RootSiblingParent>
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
