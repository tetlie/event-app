import { BlurView } from "expo-blur";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingsScreen from "../screens/ListingsScreen";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Events"
      component={ListingsScreen}
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
        headerTintColor: colors.dark,
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

export default FeedNavigator;
