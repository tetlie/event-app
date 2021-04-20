import { FlatList, StyleSheet, View } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";
import React, { useContext } from "react";

import AuthContext from "../auth/context";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import authStorage from "../auth/storage";
import colors from "../config/colors";

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  // add firebase auth cotntext

  const handleLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Marius"
          subTitle="marius@domain.com"
          image={require("../assets/tetlie.png")}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          title="My Events"
          IconComponent={
            <Icon name="calendar-edit" backgroundColor={colors.primary} />
          }
        />
        <ListItem
          title="My Calendar"
          IconComponent={
            <Icon name="calendar-heart" backgroundColor={colors.secondary} />
          }
        />
      </View>
      <ListItem
        title="Log Out"
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
