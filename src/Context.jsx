import React, { createContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

const Context = createContext();

function ContextProvider(props) {
  const firebaseConfig = {
    apiKey: "AIzaSyB1sIjjPJl8A5aWlR2QIqeEk6gpxNcOIOk",
    authDomain: "tutorial-6b149.firebaseapp.com",
    projectId: "tutorial-6b149",
    databaseURL:
      "https://tutorial-6b149-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "tutorial-6b149.appspot.com",
    messagingSenderId: "347402765240",
    appId: "1:347402765240:web:ac2534f322cd9c6349454d",
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const [data, setData] = useState();
  useEffect(() => {
    const roomsRef = ref(db, "rooms");
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
    return () => {
      onValue(roomsRef, null);
    };
  }, [db]);

  return (
    <Context.Provider value={{ data, db }}>{props.children}</Context.Provider>
  );
}

export { ContextProvider, Context };
