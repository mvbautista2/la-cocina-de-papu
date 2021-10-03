import React, { useState, useCallback } from "react";
import { ScrollView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Search from "../../components/Search";
import { getMeApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import StatusBar from "../../components/StatusBar";
import colors from "../../styles/colors";
import ScreenLoading from "../../components/ScreenLoading";
import UserInfo from "../../components/Account/UserInfo";
import Menu from "../../components/Account/Menu";

export default function Account() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();
  console.log(auth);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        setUser(response);
      })();
    }, [])
  );
  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!user ? (
        <ScreenLoading size="large" color="#f00" />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user} />
            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
}
