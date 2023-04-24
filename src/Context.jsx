import React, { createContext, useState, useEffect } from "react";
import { getDatabase, ref, set, get, onValue, child } from "firebase/database";
import { initializeApp } from "firebase/app";
import roomData from "./data/roomData";
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

  const [data, setData] = useState(roomData);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const newRoomsRef = child(dbRef, "rooms/newRooms");
    onValue(newRoomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setData(data);
      }
    });
  }, []);

  function cleanRoom(raumnummer, aufgabeId, badezimmer) {
    if (badezimmer) {
      const newRooms = data.map((room) => {
        if (room.raumnummer === raumnummer) {
          room.badezimmerAufgaben.forEach((aufgabe) => {
            if (aufgabe.id === aufgabeId) {
              aufgabe.erledigt = !aufgabe.erledigt;
            }
            const allAufgabenErledigt = room.aufgaben.every(
              (aufgabe) => aufgabe.erledigt
            );
            const allBadezimmerAufgabenErledigt = room.badezimmerAufgaben.every(
              (aufgabe) => aufgabe.erledigt
            );
            room.reinigunsstatus =
              allAufgabenErledigt && allBadezimmerAufgabenErledigt;
          });
        }
        return room;
      });
      set(ref(db, "rooms/"), {
        newRooms,
      });
    } else {
      const newRooms = roomData.map((room) => {
        if (room.raumnummer === raumnummer) {
          room.aufgaben.forEach((aufgabe) => {
            if (aufgabe.id === aufgabeId) {
              aufgabe.erledigt = !aufgabe.erledigt;
            }
          });
        }
        return room;
      });
      set(ref(db, "rooms/"), {
        newRooms,
      });
    }
  }

  return (
    <Context.Provider value={{ data, cleanRoom }}>
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
