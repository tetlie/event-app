import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { AuthProvider } from "./app/auth/auth";
import { NavigationContainer } from "@react-navigation/native";
import OfflineNotice from "./app/components/OfflineNotice";
import React from "react";
import { enableScreens } from "react-native-screens";
import { getAuthContext } from "./app/auth/auth";
import navigationTheme from "./app/navigation/navigationTheme";

enableScreens();

export default function App() {
  return (
    <AuthProvider>
      <Container />
    </AuthProvider>
  );
}

export function Container() {
  const { user } = getAuthContext();

  return (
    <>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </>
  );
}
