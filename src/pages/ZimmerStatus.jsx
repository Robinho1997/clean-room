import React from "react";
import roomData from "../data/roomData";
import "../styles/zimmerstatus.css";

function ZimmerStatus() {
  const floorOne = roomData.map((room) => {
    if (room.etage === 1) {
      return (
        <p key={room.id} className={`room-number ${room.reinigunsstatus === "unsauber" ? "cleaned" : "dirty "}`}>
          {room.raumnummer}
        </p>
      );
    }
  });
  const floorTwo = roomData.map((room) => {
    if (room.etage === 2) {
      return (
        <p key={room.id} className={`room-number ${room.reinigunsstatus === "unsauber" ? "dirty" : "cleaned"}`}>
          {room.raumnummer}
        </p>
      );
    }
  });
  const floorThree = roomData.map((room) => {
    if (room.etage === 3) {
      return (
        <p key={room.id} className={`room-number ${room.reinigunsstatus === "unsauber" ? "dirty" : "cleaned"}`}>
          {room.raumnummer}
        </p>
      );
    }
  });
  const sweet = roomData.map((room) => {
    if (room.etage === 4) {
      return (
        <p key={room.id} className={`room-number ${room.reinigunsstatus === "unsauber" ? "dirty" : "cleaned"}`}>
          {room.raumnummer}
        </p>
      );
    }
  });

  return (
    <div className="zimmer-status-div">
      <div className="floor">
        <h2 className="header">1. Etage</h2>
        <div className="room-numbers-grid">{floorOne}</div>
      </div>
      <div className="floor">
        <h2 className="header">2. Etage</h2>
        <div className="room-numbers-grid">{floorTwo}</div>
      </div>
      <div className="floor">
        <h2 className="header">3. Etage</h2>
        <div className="room-numbers-grid">{floorThree}</div>
      </div>
      <div className="floor">
        <h2 className="header">Sweet</h2>
        <div className="room-numbers-grid">{sweet}</div>
      </div>
    </div>
  );
}

export default ZimmerStatus;
