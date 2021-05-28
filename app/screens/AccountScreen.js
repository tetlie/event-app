import { FlatList, StyleSheet, View } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";

import Icon from "../components/Icon";
import React from "react";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebaseInstance from "../api/firebaseInstance";
import { getAuthContext } from "../auth/auth";
import routes from "../navigation/routes";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.FAVORITES,
  },
  {
    title: "Favorites",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.FAVORITES,
  },
];

function AccountScreen({ navigation }) {
  const { user } = getAuthContext();

  const handleLogOut = async () => {
    await firebaseInstance.auth().signOut();
  };

  return (
    <Screen style={styles.screen}>
      {user && (
        <View style={styles.container}>
          <ListItem
            title={user.displayName && user.displayName}
            subTitle={user.email}
            image={require("../assets/tetlie.png")}
          />
        </View>
      )}
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              hint={`Press to go to ${item.title}`}
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        hint="Press to log out"
        IconComponent={<Icon name="logout" backgroundColor={colors.danger} />}
        onPress={handleLogOut}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
