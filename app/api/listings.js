import client from "./client";
import firebaseInstance from "./firebaseInstance";

const endpoint = "events";

const getListings = () => client.get(endpoint);

export const addListing = async (listing) => {
  const eventCollection = firebaseInstance.firestore().collection(endpoint);
  const eventRef = await eventCollection.add({
    user: "user.id",
    title: listing.title,
    location: listing.location,
    category: listing.category.label,
    description: listing.description,
  });

  listing.images.forEach(async (image, index) => {
    console.log(image);
    const storageRef = firebaseInstance.storage().ref(eventRef.id);
    const imageChild = storageRef.child(eventRef.id + "_" + index);
    await imageChild.put(image[index]);
  });
};

export default {
  addListing,
  getListings,
};
