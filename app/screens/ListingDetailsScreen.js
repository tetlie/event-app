import { StyleSheet, View } from "react-native";

import { Image } from "react-native-expo-image-cache";
import ListItem from "../components/lists/ListItem";
import React from "react";
import Text from "../components/Text";
import colors from "../config/colors";

function ListingDetailsScreen({ route }) {
  const event = route.params;

  let timeStart;
  let timeEnd;

  if (event.time) {
    timeStart = new Date(event.time.time_start.seconds).toLocaleString();
    timeEnd = new Date(event.time.time_end.seconds).toLocaleString();
  }

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
        {event.location && <Text style={styles.price}>{event.location}</Text>}
        {event.time && <Text style={styles.price}>{timeStart}</Text>}
        {event.description && <Text>{event.description}</Text>}
        {event.time && (
          <Text>
            {timeStart} — {timeEnd}
          </Text>
        )}
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
