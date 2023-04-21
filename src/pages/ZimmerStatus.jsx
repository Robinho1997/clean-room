import React from "react";
import roomData from "../data/roomData";
import "../styles/zimmerstatus.css";
import { Link } from "react-router-dom";

function ZimmerStatus() {
  let floorOne = [];
  let floorTwo = [];
  let floorThree = [];
  let sweet = [];

  for (let i = 0; i < roomData.length; i++) {
    let room = roomData[i];
    if (roomData[i].etage === 1) {
      floorOne.push(
        <Link
          key={room.id}
          to={`/zimmer/${room.raumnummer}`}
          className={`room-number ${
            room.reinigunsstatus === "unsauber" ? "cleaned" : "dirty "
          }`}
        >
          {room.raumnummer}
        </Link>
      );
    } else if (roomData[i].etage === 2) {
      floorTwo.push(
        <Link
          key={room.id}
          to={`/zimmer/${room.raumnummer}`}
          className={`room-number ${
            room.reinigunsstatus === "unsauber" ? "cleaned" : "dirty "
          }`}
        >
          {room.raumnummer}
        </Link>
      );
    } else if (roomData[i].etage === 3) {
      floorThree.push(
        <Link
          key={room.id}
          to={`/zimmer/${room.raumnummer}`}
          className={`room-number ${
            room.reinigunsstatus === "unsauber" ? "cleaned" : "dirty "
          }`}
        >
          {room.raumnummer}
        </Link>
      );
    } else if (roomData[i].etage === 4) {
      sweet.push(
        <Link
          key={room.id}
          to={`/zimmer/${room.raumnummer}`}
          className={`room-number ${
            room.reinigunsstatus === "unsauber" ? "cleaned" : "dirty "
          }`}
        >
          {room.raumnummer}
        </Link>
      );
    }
  }

  return (
    <div className="zimmer-status-div">
      <div className="floor">
        <h2 className="header">1. Etage</h2>
        <div className="room-numbers-div">{floorOne}</div>
      </div>
      <div className="floor">
        <h2 className="header">2. Etage</h2>
        <div className="room-numbers-div">{floorTwo}</div>
      </div>
      <div className="floor">
        <h2 className="header">3. Etage</h2>
        <div className="room-numbers-div">{floorThree}</div>
      </div>
      <div className="floor">
        <h2 className="header">Sweet</h2>
        <div className="room-numbers-div">{sweet}</div>
      </div>
    </div>
  );
}

export default ZimmerStatus;
