import React, { useState } from 'react';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CreateNote from './Notes/CreateNote';
import FormNote from './Notes/FormNote';

const NoteList = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="table-responsive mb-5">
            <div className="card mb-5">
                <button
                    className="btn btn-success sticky-top"
                    type="button"
                    onClick={handleOpen}
                >
                    Crear nota <NoteAddIcon />
                </button>
                <CreateNote 
                    open={open} 
                    handleClose={handleClose}
                    title="Crear nota"
                    body={
                        <FormNote 
                            handleClose={handleClose} 
                            textAction="Guardar nota"
                        />
                    }
                />
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

export default NoteList;