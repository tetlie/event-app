import { BlurView } from "expo-blur";
import LoginScreen from "../screens/LoginScreen";
import React from "react";
import RegisterScreen from "../screens/RegisterScreen";
import { StyleSheet } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";
import colors from "../config/colors";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={({ route }) => ({
        headerTintColor: colors.dark,
        headerBackground: () => (
          <BlurView
            tint="dark"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      })}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={({ route }) => ({
        headerTintColor: colors.dark,
        headerBackground: () => (
          <BlurView
            tint="dark"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
