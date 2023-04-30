import React, { useContext, useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { Context } from "../Context";

function Aufgabe(props) {
  const { db } = useContext(Context);
  let styles = { color: props.aufgabe.erledigt ? "green" : "red" };
  let bereich = props.badezimmer ? "badezimmerAufgaben" : "aufgaben";

  const [updatedRaumnummer, setUpdatedRaumnummer] = useState(null);

  useEffect(() => {
    if (props.raumnummer >= 11 && props.raumnummer <= 16) {
      setUpdatedRaumnummer(props.raumnummer - 11);
    } else if (props.raumnummer >= 21 && props.raumnummer <= 26) {
      setUpdatedRaumnummer(props.raumnummer - 15);
    } else if (props.raumnummer >= 31 && props.raumnummer <= 36) {
      setUpdatedRaumnummer(props.raumnummer - 19);
    } else if (props.raumnummer == 40) {
      setUpdatedRaumnummer(props.raumnummer - 22);
    }
  }, []);

  function updateData() {
    set(
      ref(db, `rooms/${updatedRaumnummer}/${bereich}/${props.id}/erledigt`),
      !props.aufgabe.erledigt
    );
  }

  return (
    <div>
      <p style={styles}>{props.aufgabeName}</p>
      <input onClick={updateData} type="checkbox" />
    </div>
  );
}

export default Aufgabe;
