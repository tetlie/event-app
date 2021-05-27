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
  const userContext = useAuth();

  return (
    <AuthProvider>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {/* {userContext.user ? <AppNavigator /> : <AuthNavigator />} */}
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
