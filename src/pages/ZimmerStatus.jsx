import React, { useContext, useEffect } from "react";
import "../styles/zimmerstatus.css";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

function ZimmerStatus() {
  const { data } = useContext(Context);
  const dataArray = data ? Object.values(data) : [];
  let elements;
  if (data) {
    elements = dataArray.map((room) => {
      return (
        <Link
          key={nanoid()}
          to={`zimmer/${room.raumnummer}`}
          className="room-number"
        >
          {room.raumnummer}
        </Link>
      );
    });
  }
  return <div className="zimmer-status-div">{elements}</div>;
}

export default ZimmerStatus;
