import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import Screen from "../components/Screen";
import firebaseInstance from "../api/firebaseInstance";
import routes from "../navigation/routes";

function ListingsScreen({ navigation }) {
  const [events, setEvents] = useState(null);
  const [imageData, setImageData] = useState(null);

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
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getImages = () => {
      events.forEach(async (event) => {
        const storageRef = firebaseInstance.storage().ref(event.id);
        const imageChild = storageRef.child("0.jpeg" || "0");
        const url = await imageChild.getDownloadURL();
        setImageData(url);
      });
    };
  }, [events]);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={events}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.time && Date(item.time.seconds)}
            imageUrl={imageData}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            thumbnailUrl={imageData}
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
