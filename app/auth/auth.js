import React, { createContext, useContext, useEffect, useState } from "react";

import firebaseInstance from "../api/firebaseInstance";

const AuthContext = createContext({ user: null, favorites: [] });

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    return firebaseInstance.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
    });
  });

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseInstance.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return clearInterval(handle);
  });

  useEffect(() => {
    const getFavorites = async () => {
      const collection = firebaseInstance.firestore().collection("users");
      const doc = collection.doc(user?.uid);
      const unsubscribe = doc.onSnapshot((doc) => {
        const favoritesData = doc.data() && [...doc.data().eventsSubscribed];
        setFavorites(favoritesData);
      });
      return () => unsubscribe();
    };
    getFavorites();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, favorites }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
