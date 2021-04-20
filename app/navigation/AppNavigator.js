import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import colors from "../config/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      style: {
        backgroundColor: colors.light,
      },
    }}
  >
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="calendar-month"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="New"
      component={ListingEditScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="calendar-plus"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="calendar-account"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
