import firebaseInstance from "./firebaseInstance";
import { useAuth } from "../auth/storage";

const endpoint = "events";

export const addListing = async (listing) => {
  const userContext = useAuth();

  console.log(listing);
  const eventCollection = firebaseInstance.firestore().collection(endpoint);
  const eventRef = await eventCollection.add({
    user: {
      uid: userContext.uid,
      displayName: userContext.displayName,
    },
    title: listing.title,
    location: listing.location,
    category: listing.category.label,
    description: listing.description,
    time: listing.time_start,
  });

  const uploadImage = async (uri, index) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebaseInstance
      .storage()
      .ref()
      .child(eventRef.id + "/" + index);

    return ref.put(blob);
  };

  listing.images.forEach(async (uri, index) => {
    uploadImage(uri, index);
  });
};

export default {
  addListing,
};
