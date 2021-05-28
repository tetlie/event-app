import React, { createContext, useContext, useEffect, useState } from "react";

import firebaseInstance from "../api/firebaseInstance";

const AuthContext = createContext({ user: null, favorites: [] });

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    firebaseInstance.auth().onAuthStateChanged(function (currentuser) {
      if (currentuser) {
        setUser(currentuser);
      } else {
        setUser(null);
      }
    });
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

// getAuthContext
export const getAuthContext = () => {
  return useContext(AuthContext);
};
