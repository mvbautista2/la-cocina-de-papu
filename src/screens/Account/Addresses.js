import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { size } from "lodash";
import AddressList from "../../components/Address/AddressList";
import { getAddressesApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";

export default function Addresses() {
  const { auth } = useAuth();
  const [addresses, setAddresses] = useState(null);
  const [reloadAddress, setReloadAddress] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setAddresses(null);
      (async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
        setReloadAddress(false);
      })();
    }, [reloadAddress])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis direcciones</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("add-address")}
      >
        <View style={styles.addAdress}>
          <Text style={styles.addAdressText}>Agregar dirección</Text>
          <IconButton icon="arrow-right" color="#000" size={19} />
        </View>
      </TouchableWithoutFeedback>
      {!addresses ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : size(addresses) === 0 ? (
        <Text style={styles.noAddressText}> Crea tu primera dirección</Text>
      ) : (
        <AddressList
          addresses={addresses}
          setReloadAddress={setReloadAddress}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  addAdress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAdressText: {
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
  },
  noAddressText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
