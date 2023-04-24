import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/room.css";
import roomData from "../data/roomData";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, child } from "firebase/database";

function Room() {
  const { raumnummer } = useParams();
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

  const [myData, setMyData] = useState(roomData);



  useEffect(() => {
    const dbRef = ref(getDatabase());
    const newRoomsRef = child(dbRef, "rooms/newRooms");
    onValue(newRoomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMyData(data);
      }
    });
  }, []);





  function cleanRoom(raumnummer, aufgabeId, badezimmer) {
    if (badezimmer) {
      const newRooms = roomData.map((room) => {
        if (room.raumnummer === raumnummer) {
          room.badezimmerAufgaben.forEach((aufgabe) => {
            if (aufgabe.id === aufgabeId) {
              aufgabe.erledigt = !aufgabe.erledigt;
            }
            const allAufgabenErledigt = room.aufgaben.every((aufgabe) => aufgabe.erledigt);
            const allBadezimmerAufgabenErledigt = room.badezimmerAufgaben.every((aufgabe) => aufgabe.erledigt);
            room.reinigunsstatus = allAufgabenErledigt && allBadezimmerAufgabenErledigt;
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

  const room = myData.find((room) => room.raumnummer == raumnummer);

  const Aufgaben = room.aufgaben.map((aufgabe) => {
    return (
      <div className="aufgabe" key={aufgabe.id}>
        <p style={{ color: aufgabe.erledigt ? "green" : "red" }}>
          {aufgabe.name}
        </p>
        <input
          onClick={() => cleanRoom(room.raumnummer, aufgabe.id)}
          type="checkbox"
        />
      </div>
    );
  });

  const BadezimmerAufgaben = room.badezimmerAufgaben.map((aufgabe) => {
    return (
      <div className="aufgabe" key={aufgabe.id}>
        <p style={{ color: aufgabe.erledigt ? "green" : "red" }}>
          {aufgabe.name}
        </p>
        <input
          type="checkbox"
          onClick={() => cleanRoom(room.raumnummer, aufgabe.id, true)}
        />
      </div>
    );
  });

  return (
    <div className="room-page">
      <div className="aufgaben-container">
        <div>
          <div className="icon-and-header">
            <span className="material-symbols-outlined icon">hotel</span>
            <h1 className="aufgabe-header">Zimmer {raumnummer}</h1>
          </div>
          {Aufgaben}
        </div>
        <div>
          <div className="icon-and-header">
            <span className="material-symbols-outlined icon">bathtub</span>
            <h2 className="aufgabe-header">Badezimmer Aufgaben</h2>
          </div>
          {BadezimmerAufgaben}
        </div>
      </div>
    </div>
  );
}

export default Room;
