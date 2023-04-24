import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import { useParams } from "react-router-dom";
import "../styles/room.css";


function Room() {
  const { raumnummer } = useParams();
  const {data,cleanRoom} = useContext(Context)


  const room = data.find((room) => room.raumnummer == raumnummer);

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
