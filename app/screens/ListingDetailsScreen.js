import { ScrollView, StyleSheet, View } from "react-native";

import { Image } from "react-native-expo-image-cache";
import ListItem from "../components/lists/ListItem";
import React from "react";
import Text from "../components/Text";
import colors from "../config/colors";

function ListingDetailsScreen({ route }) {
  const event = route.params;

  return (
    <ScrollView>
      <Image
        style={styles.image}
        preview={event.image}
        tint="dark"
        uri={event.image}
      />
      <View style={styles.detailsContainer}>
        {event.title && <Text style={styles.title}>{event.title}</Text>}
        {event.location && <Text style={styles.price}>{event.location}</Text>}
        {event.time && (
          <>
            <Text style={styles.price}>
              {event.time.toDate().toDateString()}
            </Text>
            <Text style={styles.price}>
              {event.time.toDate().toLocaleTimeString()}
            </Text>
          </>
        )}
        {event.description && <Text>{event.description}</Text>}
        {event.category && <Text style={styles.price}>{event.category}</Text>}
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/tetlie.png")}
            title={event.creator.displayName}
          />
        </View>
      </View>
    </ScrollView>
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
