import React, { useContext, useEffect } from "react";
import "../styles/zimmerstatus.css";
import { Context } from "../Context";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

function ZimmerStatus() {
  const { data,db } = useContext(Context);
  const dataArray = data ? Object.values(data) : [];
  let elements;
console.log(dataArray)

  //check if all aufgaben erledigt is true and all badezimmerAufgaben erledigt is true , then set zimmerstatus to true
  //if not set zimmerstatus to false
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
}, [])

  
  if (data) {
    elements = dataArray.map((room) => {
      return (
        <Link
          key={nanoid()}
          to={`zimmer/${room.raumnummer}`}
          className={room.reinigunsstatus ? "cleaned" : "dirty"}
        >
          {room.raumnummer}
        </Link>
      );
    });
  }
  return <div className="zimmer-status-div">{elements}</div>;
}

export default ZimmerStatus;
