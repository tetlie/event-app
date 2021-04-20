import client from "./client";
import firebaseInstance from "./firebaseInstance";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

export const addListing = async (listing, onUploadProgress) => {
  firebaseInstance.firestore().collection("events").add({
    title: listing.title,
    price: listing.price,
    category: listing.category.value,
    description: listing.description,
  });

  // listing.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image" + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
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
