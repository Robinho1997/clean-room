import React, { useContext, useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { Context } from "../Context";

function Aufgabe(props) {
  const { db } = useContext(Context);
  let styles = { 
    color: props.aufgabe.erledigt ? "green" : "red",
    textDecoration: props.aufgabe.erledigt ? "line-through" : "none",
    textDecorationThickness: "2px",
    textDecorationColor: "red",
  };
  let bereich = props.badezimmer ? "badezimmerAufgaben" : "aufgaben";

  const [indexNummer, setIndexNummer] = useState(null);

  useEffect(() => {
    if (props.raumnummer >= 11 && props.raumnummer <= 16) {
      setIndexNummer(props.raumnummer - 11);
    } else if (props.raumnummer >= 21 && props.raumnummer <= 26) {
      setIndexNummer(props.raumnummer - 15);
    } else if (props.raumnummer >= 31 && props.raumnummer <= 36) {
      setIndexNummer(props.raumnummer - 19);
    } else if (props.raumnummer == 40) {
      setIndexNummer(props.raumnummer - 22);
    }
  }, []);

  function updateData() {
    set(
      ref(db, `rooms/${indexNummer}/${bereich}/${props.id}/erledigt`),
      !props.aufgabe.erledigt
    );
  }

  return (
  
      <p className="aufgabe" onClick={updateData}  style={styles}>{props.aufgabeName}</p>

  );
}

export default Aufgabe;
