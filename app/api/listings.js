import firebaseInstance from "./firebaseInstance";

const endpoint = "events";

export const addListing = async (listing) => {
  console.log(listing);
  const eventCollection = firebaseInstance.firestore().collection(endpoint);
  const eventRef = await eventCollection.add({
    user: "user.id",
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
