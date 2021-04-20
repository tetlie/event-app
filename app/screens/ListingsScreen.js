import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebaseInstance from "../api/firebaseInstance";
import routes from "../navigation/routes";

function ListingsScreen({ navigation }) {
  const [events, setEvents] = useState(null);

  const getData = async () => {
    let ref = firebaseInstance.firestore().collection("events");
    ref.onSnapshot((snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setEvents(data);
      console.log(events);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={events}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={new Date(item.time.time_start.seconds).toLocaleString()}
            imageUrl={"bilde"}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            thumbnailUrl={"bilde"}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default ListingsScreen;
