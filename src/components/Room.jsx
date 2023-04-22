import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/room.css";

import { Context } from "../Context";
function Room() {
  const { rooms, toggleErledigt, setRooms } = useContext(Context);
  const { raumnummer } = useParams();

  const room = rooms.find((room) => room.raumnummer == raumnummer);

  const Aufgaben = room.aufgaben.map((aufgabe, index) => {
    return (
      <div className="aufgabe" key={aufgabe.id}>
        <p style={{ color: aufgabe.erledigt ? "green" : "red" }}>
          {aufgabe.name}
        </p>
        <input
          onChange={() => toggleErledigt(raumnummer, index)}
          type="checkbox"
          checked={aufgabe.erledigt}
        />
      </div>
    );
  });

  const BadezimmerAufgaben = room.badezimmerAufgaben.map((aufgabe, index) => {
    return (
      <div className="aufgabe" key={aufgabe.id}>
        <p style={{ color: aufgabe.erledigt ? "green" : "red" }}>
          {aufgabe.name}
        </p>
        <input
          onChange={() => toggleErledigt(raumnummer, index, true)}
          type="checkbox"
          checked={aufgabe.erledigt}
        />
      </div>
    );
  });

  // map through rooms and find the room with the same raumnummer as the one in the url
  // then check if all aufgaben and badezimmerAufgaben of that room are erledigt then set the room to erledigt
  // then setRooms with the new rooms array

  function leaveRoom() {
    const newRooms = rooms.map((room) => {
      if (room.raumnummer == raumnummer) {
        const aufgabenErledigt = room.aufgaben.every((aufgabe) => aufgabe.erledigt);
        const badezimmerAufgabenErledigt = room.badezimmerAufgaben.every((aufgabe) => aufgabe.erledigt);
        if (aufgabenErledigt && badezimmerAufgabenErledigt) {
          room.reinigunsstatus = true;
          console.log(room)
        } else {
          room.reinigunsstatus = false;
          console.log(room)
        }
      }
      return room;
    });

    setRooms(newRooms);
  }






  

  

  return (
    <div className="room-page">
      <div className="aufgaben-container">
        <div>
          <div className="icon-and-header">
          <span className="material-symbols-outlined icon">hotel</span>
            <h1 className="aufgabe-header" onClick={leaveRoom}>
              Zimmer {raumnummer}
            </h1>
           
          </div>
          {Aufgaben}
        </div>
        <div>
          <div className="icon-and-header">
          <span className="material-symbols-outlined icon">bathtub</span>
            <h2 className="aufgabe-header">
              Badezimmer Aufgaben
            </h2>
          
          </div>
          {BadezimmerAufgaben}
        </div>
      </div>
    </div>
  );
}

export default Room;
