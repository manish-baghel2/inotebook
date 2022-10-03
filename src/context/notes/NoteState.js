// import { useState } from "react";
import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // get all notes 
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYTczMDM1MzRjOGQxODBiZmZjNjM2In0sImlhdCI6MTY2NDc3NTU2Nn0.wtpwsaHHAJ163Evm-n2XiUivLeyNKSJ5PZ-RHuweY9M'
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // add a note
    const addNote = async (title, description, tag) => {
        // todo: api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYTczMDM1MzRjOGQxODBiZmZjNjM2In0sImlhdCI6MTY2NDc3NTU2Nn0.wtpwsaHHAJ163Evm-n2XiUivLeyNKSJ5PZ-RHuweY9M'
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    // delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYTczMDM1MzRjOGQxODBiZmZjNjM2In0sImlhdCI6MTY2NDc3NTU2Nn0.wtpwsaHHAJ163Evm-n2XiUivLeyNKSJ5PZ-RHuweY9M'
            }
        });
        const json = response.json(); 
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
        // setNotes(json);
    }
    // edit a note
    const editNote = async (id, title, description, tag) => {
        // API calls for updating the backend
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYTczMDM1MzRjOGQxODBiZmZjNjM2In0sImlhdCI6MTY2NDc3NTU2Nn0.wtpwsaHHAJ163Evm-n2XiUivLeyNKSJ5PZ-RHuweY9M'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log(json)
        // create a deep copy of the editted note
        let newNote = JSON.parse(JSON.stringify(notes));
        // logic to edit in client
        for (let index = 0; index < newNote.length; index++) {
            if (newNote[index]._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;