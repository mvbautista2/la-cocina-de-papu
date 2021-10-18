import React, { useState, useMemo, useEffect } from "react";
import { Text, View, Button, LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import jwtDecode from "jwt-decode";
import AppNavigation from "./src/navigation/AppNavigation";
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token";
export default function App() {
  LogBox.ignoreLogs([
    "Found screens with the same name nested inside one another. Check: home, home > home This can cause confusing behavior during navigation. Consider using unique names for each screen instead.",
  ]);
  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
    setAuth(null);
  }, []);
  const login = (user) => {
    console.log("Login app.js");
    console.log(user);
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
  };
  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );
  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>{auth ? <AppNavigation /> : <AuthScreen />}</PaperProvider>
    </AuthContext.Provider>
  );
}
