import React, { useState, useContext, useEffect } from "react";
import { set, ref, push, child, update, onValue, remove } from "firebase/database";
import { Context } from "../Context";
import { nanoid } from "nanoid";

function AddInfos() {
    const { db } = useContext(Context)
    const [data, setData] = useState();
    const dataArray = data ? Object.values(data) : [];
    const [date, setDate] = useState(new Date());
    const [toggleAddDiv, setToggleAddDiv] = useState(false);
    const [inputValue, setInputValue] = useState("");
    let elements;

    useEffect(() => {
        const infosRef = ref(db, "infos");
        onValue(infosRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    }, [db]);

    function toggleAddOption() {
        setToggleAddDiv((prev) => (prev = !prev));
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    if (data) {
        elements = dataArray.map((info) => {
            return (
                <div key={nanoid()} className="info-div">
                    <p>
                        {info.data}
                    </p>
                    <span onClick={() => deleteInfo(info.data)} className="material-symbols-outlined" style={{
                        color
                            : "red"
                    }}>
                        delete
                    </span>
                </div>
            );
        });
    }


    function saveInfosToFirebase() {
        const infoRef = child(ref(db, "infos"), inputValue);
        const updates = {
            data: inputValue
        };
        update(infoRef, updates);
    }



    function deleteInfo(value) {
        const infoRef = child(ref(db, "infos"), value);
        remove(infoRef);
    }



    useEffect(() => {
        const timerID = setInterval(() => {
            setDate(new Date());
        }, 1000000);

        return () => clearInterval(timerID);
    }, []);


    return (
        <div>
            <span onClick={toggleAddOption}
                className="material-symbols-outlined add-icon">
                add_circle
            </span>
            <div className="add-aufgabe-div" style={{ display: toggleAddDiv ? "flex" : "none" }}>
                <input value={inputValue} onChange={handleInputChange} type="text"></input>
                <button onClick={saveInfosToFirebase}>ADD </button>
            </div>
            <div className="infos-container">
                {elements && <h2 className="date">Tätigkeiten {date.toLocaleDateString()}</h2>}
                {elements}
            </div>

        </div>
    )
}

export default AddInfos