import React, { createContext, useContext, useEffect, useState } from "react";

import firebaseInstance from "../api/firebaseInstance";

const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const [userData, setUserData] = useState();

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
    if (user) {
      let ref = firebaseInstance.firestore().collection("users").doc(user.uid);

      ref.onSnapshot((docSnapshot) => {
        let data = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
        setUserData(data);
        console.log(userData);
      });
    }
  }, []);

  // Sjekk hvert 10. minutt om en bruker er logget inn

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseInstance.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return clearInterval(handle);
  });

  // AuthContext => en wrapper vi trenger for å gi andre komponenter tilgang på contexten

  return (
    <AuthContext.Provider value={user}>
      <>{children}</>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
