import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { API_URL } from "../../utils/constants";

export default function ListProduct(props) {
  const { products } = props;
  const navigation = useNavigation();

  const goToProduct = (slug) => {
    navigation.push("product", { idProduct: slug });
  };

  return (
    <View style={styles.container}>
      {map(products, (product) => (
        <TouchableWithoutFeedback
          key={product.slug}
          onPress={() => goToProduct(product.slug)}
        >
          <View style={styles.containerProduct}>
            <View style={styles.product}>
              <Image
                style={styles.image}
                source={{
                  uri: `${API_URL}${product.image.url}`,
                }}
              />
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {product.title}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    margin: -3,
  },
  containerProduct: {
    width: "50%",
    padding: 3,
  },
  product: {
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  image: {
    height: 150,
    resizeMode: "contain",
  },
  name: {
    marginTop: 15,
    fontSize: 18,
  },
});
