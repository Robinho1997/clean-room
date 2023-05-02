import React, { useContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Context } from "../Context";
import { useParams } from "react-router-dom";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import "../styles/room.css";
import Aufgabe from "./Aufgabe";

function Room() {
  const { raumnummer } = useParams();
  const { data, db } = useContext(Context);
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

  function checkAllTasks() {
    if (data) {
      dataArray.find((room) => room.raumnummer == raumnummer);
    room.aufgaben.forEach((aufgabe) => {
      aufgabe.erledigt = true;
    });
    room.badezimmerAufgaben.forEach((aufgabe) => {
      aufgabe.erledigt = true;
    });
    set(ref(db, "rooms"), data);
    }
    
  }

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
      <div className="footer-room">
        <button onClick={checkAllTasks} className="check-all-btn">
          <span className="material-symbols-outlined check-icon">done_all</span>CHECK ALL
        </button>
        <Link className="next-room-link" to={`/zimmer/${linkNummer}`}>
          ZIMMER {linkNummer}{" "}
          <span className="material-symbols-outlined next-icon">navigate_next</span>
        </Link>
      </div>
    </div>
  );
}

export default Room;
