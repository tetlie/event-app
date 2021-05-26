import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import Screen from "../components/Screen";
import firebaseInstance from "../api/firebaseInstance";
import routes from "../navigation/routes";

function ListingsScreen({ navigation }) {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let ref = firebaseInstance.firestore().collection("events");
    const unsubscribe = ref.onSnapshot((snapshot) => {
      let data = [];
      snapshot.forEach(async (doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setEvents(data);
      console.log(events);
    });
    return unsubscribe;
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={events}
        keyExtractor={(event) => event.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.time && item.time.toDate().toDateString()}
            imageUrl={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            thumbnailUrl={item.image}
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
