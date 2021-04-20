import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Image } from "react-native-expo-image-cache";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";

function ListingDetailsScreen({ route }) {
  const event = route.params;

  const timeStart = new Date(event.time.time_start.seconds).toLocaleString();
  const timeEnd = new Date(event.time.time_end.seconds).toLocaleString();

  return (
    <View>
      {/* <Image
        style={styles.image}
        preview={{ uri: event.images[0].thumbnailUrl }}
        tint="light"
        uri={event.images[0].url}
      /> */}
      <Image style={styles.image} tint="dark" />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.price}>{event.location}</Text>
        <Text style={styles.price}>{timeStart}</Text>
        <Text>{event.description}</Text>
        <Text>
          {timeStart} — {timeEnd}
        </Text>
        <Text style={styles.price}>{event.category}</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/tetlie.png")}
            title="Marius"
            subTitle="5 Events"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
