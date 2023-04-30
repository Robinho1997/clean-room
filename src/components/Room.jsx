import React, { useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";
import { Context } from "../Context";
import { useParams } from "react-router-dom";
import "../styles/room.css";
import Aufgabe from "./Aufgabe";

function Room() {
  const { raumnummer } = useParams();
  const { data } = useContext(Context);
  const dataArray = data ? Object.values(data) : [];
  const room = dataArray.find((room) => room.raumnummer == raumnummer);

  let Aufgaben = null;
  let BadezimmerAufgaben = null;

  if (room) {
    Aufgaben = room.aufgaben.map((aufgabe) => {
      return (
        <Aufgabe
          key={nanoid()}
          id={aufgabe.id}
          aufgabeName={aufgabe.name}
          aufgabe={aufgabe}
          raumnummer={raumnummer}
          badezimmer={false}
        />
      );
    });
    BadezimmerAufgaben = room.badezimmerAufgaben.map((aufgabe) => {
      return (
        <Aufgabe
          key={nanoid()}
          id={aufgabe.id}
          aufgabeName={aufgabe.name}
          aufgabe={aufgabe}
          raumnummer={raumnummer}
          badezimmer={true}
        />
      );
    });
  }

  return (
    <div className="room-page">
      <h1>Zimmer {raumnummer}</h1>
      {Aufgaben}
      <h1>Badezimmer</h1>
      {BadezimmerAufgaben}
    </div>
  );
}

export default Room;
