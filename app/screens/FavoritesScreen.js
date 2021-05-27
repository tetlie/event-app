import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import Screen from "../components/Screen";
import firebaseInstance from "../api/firebaseInstance";
import { getAuthContext } from "../auth/auth";
import routes from "../navigation/routes";

function FavoritesScreen({ navigation }) {
  const { favorites } = getAuthContext();

  const [events, setEvents] = useState(null);

  const getFavoritesData = async () => {
    let data = [];
    let collection = firebaseInstance.firestore().collection("events");
    favorites?.forEach(async (docId) => {
      const newPromise = new Promise((resolve, reject) => {
        let doc = collection
          .doc(docId)
          .get()
          .then((doc) => {
            resolve({ id: doc.id, ...doc.data() });
          });
      });
      data.push(newPromise);
    });
    Promise.all(data).then((arr) => {
      setEvents(arr);
    });
  };

  useEffect(() => {
    getFavoritesData();
    console.log({ favorites });
  }, [favorites]);

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

export default FavoritesScreen;
