import firebaseInstance from "./firebaseInstance";
import { useAuth } from "../auth/auth";

const endpoint = "events";

export const addListing = async ({
  images,
  title,
  description,
  location,
  category,
  time_start,
}) => {
  const { user } = useAuth();

  const date = new Date(time_start);
  const firebaseDate = new firebaseInstance.firestore.Timestamp.fromDate(date);

  const eventCollection = firebaseInstance.firestore().collection("events");
  const eventRef = await eventCollection.add({
    creator: {
      uid: user.uid,
      displayName: user.displayName,
    },
    title: title,
    description: description,
    category: category,
    location: location,
    created: firebaseInstance.firestore.FieldValue.serverTimestamp(),
    time: firebaseDate,
  });

  const uploadImage = async (uri, index) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebaseInstance
      .storage()
      .ref()
      .child(`${user.uid}/${eventRef.id}`);

    const imagechild = await ref.put(blob);
    const url = await imageChild.getDownloadURL();
    eventCollection.doc(eventRef.id).update({ image: url });

    return imagechild;
  };

  images.forEach(async (uri, index) => {
    uploadImage(uri, index);
  });
};

export default {
  addListing,
};

// export const addListing = async (listing) => {
//   const userContext = useAuth();

//   console.log(listing);
//   const eventCollection = firebaseInstance.firestore().collection(endpoint);
//   const eventRef = await eventCollection.add({
//     user: {
//       uid: userContext.uid,
//       displayName: userContext.displayName,
//     },
//     title: listing.title,
//     location: listing.location,
//     category: listing.category.label,
//     description: listing.description,
//     time: listing.time_start,
//   });

//   const uploadImage = async (uri, index) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();

//     var ref = firebaseInstance
//       .storage()
//       .ref()
//       .child(eventRef.id + "/" + index);

//     return ref.put(blob);
//   };

//   listing.images.forEach(async (uri, index) => {
//     uploadImage(uri, index);
//   });
// };
