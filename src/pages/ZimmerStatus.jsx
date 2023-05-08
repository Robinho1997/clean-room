import React, { useContext, useEffect, useState } from "react";
import "../styles/zimmerstatus.css";
import { Context } from "../Context";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import AddInfos from "../components/AddInfos";

function ZimmerStatus() {
  const { data, db } = useContext(Context);
  const dataArray = data ? Object.values(data) : [];  

  let elements;

  function resetRooms() {
    for (const room of dataArray) {
      room.aufgaben.forEach((aufgabe) => {
        aufgabe.erledigt = false;
      });
      room.badezimmerAufgaben.forEach((aufgabe) => {
        aufgabe.erledigt = false;
      });
      room.reinigunsstatus = false;
      set(ref(db, "rooms"), dataArray);
    }
  }

  useEffect(() => {
    if (data) {
      dataArray.forEach((room) => {
        let aufgabenErledigt = true;
        let badezimmerAufgabenErledigt = true;
        let reinigunsstatus = true;
        room.aufgaben.forEach((aufgabe) => {
          if (!aufgabe.erledigt) {
            aufgabenErledigt = false;
          }
        });
        room.badezimmerAufgaben.forEach((aufgabe) => {
          if (!aufgabe.erledigt) {
            badezimmerAufgabenErledigt = false;
          }
        });
        if (!aufgabenErledigt || !badezimmerAufgabenErledigt) {
          reinigunsstatus = false;
        }
        room.reinigunsstatus = reinigunsstatus;
      });
      set(ref(db, "rooms"), data);
    }
  }, []);

  if (data) {
    elements = dataArray.map((room) => {
      return (
        <Link
          key={nanoid()}
          to={`zimmer/${room.raumnummer}`}
          className={
            room.reinigunsstatus ? "cleaned room-number" : "dirty room-number"
          }
        >
          {room.raumnummer}
        </Link>
      );
    });
  }





  return (
    <div>
         <AddInfos />
    <div className="zimmer-status-container">
      <div className="zimmer-status-div">{elements}</div>
      <button className="reset-btn" onClick={resetRooms}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
    </div>
  );
}

export default ZimmerStatus;
