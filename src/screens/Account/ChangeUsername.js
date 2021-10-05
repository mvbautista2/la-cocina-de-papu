import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { useFormik } from "formik";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-root-toast";
import { getMeApi, updateUserApi } from "../../api/user";
import { formStyles } from "../../styles";

export default function ChangeUsername() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        if (response.username) {
          await formik.setFieldValue("username", response.username);
        }
      })();
    }, [])
  );
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) throw "El usuario ya se encuentra registrado";
        navigation.goBack();
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
        formik.setFieldError("username", true);
      }
      setLoading(false);
    },
  });

  return (
    <View style={styles.content}>
      <RootSiblingParent>
        <TextInput
          label="Nombre de usuario"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("username", text)}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <Button
          mode="contained"
          style={formStyles.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Guardar
        </Button>
      </RootSiblingParent>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
});

function initialValues() {
  return {
    username: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().min(4, true).required(true),
  };
}
