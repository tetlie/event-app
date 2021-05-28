import firebaseInstance from "./firebaseInstance";

export const addListing = async ({
  images,
  title,
  description,
  location,
  category,
  time_start,
  displayName,
  uid,
}) => {
  try {
    const date = new Date(time_start);
    const firebaseDate = new firebaseInstance.firestore.Timestamp.fromDate(
      date
    );

    const eventCollection = firebaseInstance.firestore().collection("events");
    const eventRef = await eventCollection.add({
      creator: {
        uid: uid,
        displayName: displayName,
      },
      title: title,
      description: description,
      category: category.label,
      location: location,
      created: firebaseInstance.firestore.FieldValue.serverTimestamp(),
      time: firebaseDate,
    });

    images.forEach(async (uri) => {
      uploadImage(uri, eventRef, uid);
    });
  } catch (error) {
    console.log(error);
  }
};

async function uploadImage(uri, eventRef, uid) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebaseInstance.storage().ref().child(`${uid}/${eventRef.id}`);

    const imagechild = await ref.put(blob);
    const url = await imageChild.getDownloadURL();
    eventCollection.doc(eventRef.id).update({ image: url });

    return imagechild;
  } catch (error) {
    console.log(error);
  }
}

export default {
  addListing,
};
