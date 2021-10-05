import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-root-toast";
import { updateUserApi } from "../../api/user";
import { formStyles } from "../../styles";

export default function ChangePassword() {
  const { auth, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) throw "Error al cambiar la contraseña";
        //navigation.goBack();
        logout();
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
      }
    },
  });

  return (
    <View style={styles.content}>
      <RootSiblingParent>
        <TextInput
          label="Contraseña"
          style={formStyles.input}
          secureTextEntry
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <TextInput
          label="Confirme la contraseña"
          style={formStyles.input}
          secureTextEntry
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
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
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().min(4, true).required(true),
    repeatPassword: Yup.string()
      .min(4, true)
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
