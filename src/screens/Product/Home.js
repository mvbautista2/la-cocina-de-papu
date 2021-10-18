import React from "react";
import { ScrollView, LogBox } from "react-native";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search";
import NewProduct from "../../components/Home/NewProduct";
import Banner from "../../components/Home/Banner";
import colors from "../../styles/colors";

export default function Home() {
  LogBox.ignoreLogs([
    "Found screens with the same name nested inside one another. Check: home, home > home This can cause confusing behavior during navigation. Consider using unique names for each screen instead.",
  ]);
  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search />
      <ScrollView>
        <Banner />
        <NewProduct />
      </ScrollView>
    </>
  );
}
