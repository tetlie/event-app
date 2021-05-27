import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { AuthProvider } from "./app/auth/auth";
import { NavigationContainer } from "@react-navigation/native";
import OfflineNotice from "./app/components/OfflineNotice";
import React from "react";
import { enableScreens } from "react-native-screens";
import navigationTheme from "./app/navigation/navigationTheme";
import { useAuth } from "./app/auth/auth";

enableScreens();

export default function App() {
  return (
    <AuthProvider>
      <Container />
    </AuthProvider>
  );
}

export function Container() {
  const { user } = useAuth();

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
