import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col md-3'>
            <div className="card my-2 mx-2">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title">{note.title}
                            <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-warning`} style={{ left: "50%", zIndex: "1" }}>
                                {note.tag}
                            </span></h5>
                    <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
        </div >
    )
}

export default NoteItem