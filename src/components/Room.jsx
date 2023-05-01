import React, { useContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Context } from "../Context";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
  const [linkNummer, setLinkNummer] = useState(null);

  useEffect(() => {
    if (
      (raumnummer >= 11 && raumnummer <= 15) ||
      (raumnummer >= 21 && raumnummer <= 25) ||
      (raumnummer >= 31 && raumnummer <= 35)
    ) {
      setLinkNummer(Number(raumnummer) + 1);
    } else if (raumnummer == 16) {
      setLinkNummer(21);
    } else if (raumnummer == 26) {
      setLinkNummer(31);
    } else if (raumnummer == 36) {
      setLinkNummer(40);
    } else if (raumnummer == 40) {
      setLinkNummer(11);
    }
  }, [raumnummer]);

  return (
    <div className="room-page">
      <div className="aufgaben-container">
        <h1>
          <span className="material-symbols-outlined icon">room_service</span>{" "}
          Zimmer {raumnummer}
        </h1>
        {Aufgaben}
      </div>
      <div className="aufgaben-container">
        <h1>
          <span className="material-symbols-outlined icon">shower</span>{" "}
          Badezimmer {raumnummer}
        </h1>
        {BadezimmerAufgaben}
      </div>
      <Link className="next-room-link" to={`/zimmer/${linkNummer}`}>
        ZIMMER {linkNummer} <span className="material-symbols-outlined">navigate_next</span>
      </Link>
    </div>
  );
}

export default Room;
