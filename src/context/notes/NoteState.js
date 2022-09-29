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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzMDMzZjRhNGQ4ODA5YThlYzliZTQ3In0sImlhdCI6MTY2NDEwNTY4Mn0.4NcECSvkdp3mTLaYvIXVvwO-HQKbCaW5ZBJrS5o9Z8g'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzMDMzZjRhNGQ4ODA5YThlYzliZTQ3In0sImlhdCI6MTY2NDEwNTY4Mn0.4NcECSvkdp3mTLaYvIXVvwO-HQKbCaW5ZBJrS5o9Z8g'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzMDMzZjRhNGQ4ODA5YThlYzliZTQ3In0sImlhdCI6MTY2NDEwNTY4Mn0.4NcECSvkdp3mTLaYvIXVvwO-HQKbCaW5ZBJrS5o9Z8g'
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzMDMzZjRhNGQ4ODA5YThlYzliZTQ3In0sImlhdCI6MTY2NDEwNTY4Mn0.4NcECSvkdp3mTLaYvIXVvwO-HQKbCaW5ZBJrS5o9Z8g'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log(json)
        // logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;