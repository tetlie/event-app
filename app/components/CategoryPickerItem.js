import { StyleSheet, TouchableOpacity, View } from "react-native";

import Icon from "./Icon";
import React from "react";
import Text from "./Text";
import colors from "../config/colors";

function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityHint="Click to select category"
        onPress={onPress}
      >
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={90}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
