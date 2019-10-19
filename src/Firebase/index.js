import React, { createContext } from "react";
import app from "firebase/app";

export const FirebaseContext = createContext(null);

export default ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: "AIzaSyBM3NwvJ0fW_8b5xBT6DRZZebnZLIx4EoA",
      authDomain: "i-can-tell.firebaseapp.com",
      databaseURL: "https://i-can-tell.firebaseio.com",
      projectId: "i-can-tell",
      storageBucket: "i-can-tell.appspot.com",
      messagingSenderId: "611188270205",
      appId: "1:611188270205:web:9dc68e43929ae5d5",
    });
  }
  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};
