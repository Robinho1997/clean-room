import React, {useContext} from "react";
import { useParams } from "react-router-dom";
import "../styles/room.css";

import { Context } from "../Context";
function Room() {
  const { rooms, toggleErledigt } = useContext(Context);
  const { raumnummer } = useParams();

  const room = rooms.find((room) => room.raumnummer == raumnummer);

 



  const Aufgaben = room.aufgaben.map((aufgabe,index) => {
    return (
      <div className="aufgabe" key={aufgabe.id}>
        <p style={{color: aufgabe.erledigt ? "green" : "red" }}>
        {aufgabe.name}
        </p>
        <input onClick={()=>toggleErledigt(raumnummer,index)} type="checkbox" />
      </div>
    );
  });

  const BadezimmerAufgaben = room.badezimmerAufgaben.map((aufgabe,index) => {
    return (
      <div className="aufgabe" key={aufgabe.id}>
        <p style={{color: aufgabe.erledigt ? "green" : "red" }}>{aufgabe.name}</p>
        <input onClick={()=>toggleErledigt(raumnummer,index,true)}  type="checkbox" />
      </div>
    );
  });

  return (
    <div>
      <h1 className="header">Zimmer {raumnummer}</h1>
      <div className="aufgaben-container">
        <div>
          <h2 className="aufgabe-header">Zimmer Aufgaben</h2>
          {Aufgaben}
        </div>
        <div>
          <h2>Badezimmer Aufgaben</h2>
          {BadezimmerAufgaben}
        </div>
      </div>
    </div>
  );
}

export default Room;
