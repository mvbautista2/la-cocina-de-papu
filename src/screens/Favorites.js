import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import StatusBar from "../components/StatusBar";
import Search from "../components/Search";
import ScreenLoading from "../components/ScreenLoading";
import FavoriteList from "../components/Favorites/FavoriteList";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import useAuth from "../hooks/useAuth";
import { getFavoriteApi } from "../api/favorite";
import colors from "../styles/colors";

export default function Favorites() {
  const [products, setProducts] = useState(null);
  const [reloadFavorites, setReloadFavorites] = useState(false);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setProducts(null);
      (async () => {
        const response = await getFavoriteApi(auth);
        setProducts(response);
      })();
      setReloadFavorites(false);
    }, [reloadFavorites])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search />
      {!products ? (
        <ScreenLoading text="Cargando lista" size="large" color="#f00" />
      ) : size(products) === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Lista de favoritos</Text>
          <Text style={styles.text}> No tienes productos en tu lista</Text>
          <AwesomeIcon name="heart" style={styles.icon} />
        </View>
      ) : (
        <FavoriteList
          products={products}
          setReloadFavorites={setReloadFavorites}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#696969",
    padding: 50,
  },
  icon: {
    fontSize: 50,
    paddingHorizontal: 150,
    color: "#696969",
    height: 200,
  },
});
