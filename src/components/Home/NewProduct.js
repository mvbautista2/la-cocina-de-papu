import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getLastProductsApi } from "../../api/product";
import ListProduct from "./ListProduct";
export default function NewProduct() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi();
      setProducts(response);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevos productos</Text>
      {products && <ListProduct products={products} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
});
