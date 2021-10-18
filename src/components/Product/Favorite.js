import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function Favorite(props) {
  const { product } = props;

  const addFavorite = () => {
    console.log("Producto agregado a favoritos");
    console.log(product.title);
  };
  return (
    <View>
      <Button
        mode="contained"
        contentStyle={styles.btnAddFavoritesContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={addFavorite}
      >
        Añadir a favoritos
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  btnAddFavoritesContent: {
    backgroundColor: "#057b00",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
