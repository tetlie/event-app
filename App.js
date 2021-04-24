import AppNavigator from "./app/navigation/AppNavigator";
import { AuthProvider } from "./app/auth/storage";
import { NavigationContainer } from "@react-navigation/native";
import OfflineNotice from "./app/components/OfflineNotice";
import React from "react";
import { enableScreens } from "react-native-screens";
import navigationTheme from "./app/navigation/navigationTheme";
import { useAuth } from "./app/auth/storage";

enableScreens();

export default function App() {
  const userContext = useAuth();

  console.log("App.js", userContext);

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
