import firebaseInstance from "./firebaseInstance";

// const login = (email, password) => client.post("/auth", { email, password });

const fireBaseLogin = (email, password) =>
  firebaseInstance.auth().signInWithEmailAndPassword(email, password);

export default {
  fireBaseLogin,
};
