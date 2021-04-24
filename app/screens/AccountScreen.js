import { StyleSheet, View } from "react-native";

import Icon from "../components/Icon";
import { ListItem } from "../components/lists";
import React from "react";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebaseInstance from "../api/firebaseInstance";
import { useAuth } from "../auth/storage";

function AccountScreen() {
  const userContext = useAuth();
  console.log("Account", userContext);

  const handleLogOut = async () => {
    await firebaseInstance.auth().signOut();
  };

  return (
    <Screen style={styles.screen}>
      {userContext && (
        <View style={styles.container}>
          <ListItem
            title={userContext.displayName && userContext.displayName}
            subTitle={userContext.email}
            image={require("../assets/tetlie.png")}
          />
        </View>
      )}
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
