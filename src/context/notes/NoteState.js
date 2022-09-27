// import { useState } from "react";
import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6332ee2a2889f95d4c1d3fe7",
            "user": "633033f4a4d8809a8ec9be47",
            "title": "Meeting scheduled for 2 pm today",
            "description": "Please do the work on time for the meeting today",
            "tag": "team",
            "__v": 0
        },
        {
            "_id": "6332ee622889f95d4c1d3feb",
            "user": "633033f4a4d8809a8ec9be47",
            "title": "New meeting at Hotel Blue Orchids",
            "description": "event to attend today",
            "tag": "team",
            "__v": 0
        },
        {
            "_id": "6332ee662889f95d4c1d3fed",
            "user": "633033f4a4d8809a8ec9be47",
            "title": "Physics",
            "description": "cooking is necessary",
            "tag": "team",
            "__v": 0
        },
        {
            "_id": "6332ee692889f95d4c1d3fef",
            "user": "633033f4a4d8809a8ec9be47",
            "title": "current work is pending",
            "description": "we have a deadline on Monday",
            "tag": "team",
            "__v": 0
        },
        {
            "_id": "6332ee6d2889f95d4c1d3ff1",
            "user": "633033f4a4d8809a8ec9be47",
            "title": "todo list",
            "description": "work last week",
            "tag": "team",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    return (
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;