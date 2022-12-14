import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const history = useNavigate();
    useEffect(() => {
        // agar mera token available hai toh main notes load karunga nhi toh redirect karunga
        // login pe
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            history('/login');
        }
        // eslint-disable-next-line
    })
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        console.log("updating the note..", note)
        refClose.current.click();
        props.showAlert("updated successfully", 'success');
    }

    const onChange = (e) => [
        setNote({ ...note, [e.target.name]: e.target.value })
    ]
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type=" text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" >tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" vale={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your notes</h1>
                <div className="container">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes