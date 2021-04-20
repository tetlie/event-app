import { FlatList, StyleSheet, View } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";
import React, { useContext } from "react";

import AuthContext from "../auth/context";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import authStorage from "../auth/storage";
import colors from "../config/colors";
import routes from "../navigation/routes";

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogOut}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
