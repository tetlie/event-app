import React from "react";
import { Button, View, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { BlurView } from "expo-blur";

import { createNativeStackNavigator } from "react-native-screens/native-stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Events"
      component={ListingsScreen}
      options={{
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            tint="light"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetailsScreen}
      options={({ route }) => ({
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            tint="light"
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
