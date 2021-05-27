import AccountScreen from "../screens/AccountScreen";
import { BlurView } from "expo-blur";
import FavoritesScreen from "../screens/FavoritesScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
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
      name="Favorites"
      component={FavoritesScreen}
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
      name="ListingDetails"
      component={ListingDetailsScreen}
      options={({ route }) => ({
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            tint="dark"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
        title: route.params.title,
        headerLargeTitle: true,
        headerLargeTitleHideShadow: true,
      })}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
