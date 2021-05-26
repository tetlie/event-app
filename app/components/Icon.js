import React from "react";
import Text from "./Text";
import { View } from "react-native";

function Icon({ name, size = 40, backgroundColor = "#000" }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30 }}>{name}</Text>
    </View>
  );
}

export default Icon;
