import client from "./client";
import firebaseInstance from "./firebaseInstance";

const endpoint = "events";

const getListings = () => client.get(endpoint);

export const addListing = async (listing) => {
  const eventCollection = firebaseInstance.firestore().collection(endpoint);
  const eventRef = await eventCollection.add({
    user: "user.id",
    title: listing.title,
    price: listing.price,
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

/*
export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
*/

export default {
  addListing,
  getListings,
};
