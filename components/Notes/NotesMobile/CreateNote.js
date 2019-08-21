import React, { useState } from 'react';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import FormNote from './FormNote';
import ModalNote from './ModalNote';

const CreateNote = ({ getNotes }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button
                className="btn btn-success btn-block sticky-top mb-2"
                type="button"
                onClick={handleOpen}
            >
                Crear nota <NoteAddIcon />
            </button>
            <ModalNote
                open={open}
                handleClose={handleClose}
                title="Crear nota"
                body={
                    <FormNote
                        getNotes={getNotes}
                        handleClose={handleClose}
                        textAction="Guardar nota"
                    />
                }
            />
        </div>
    )
}

export default CreateNote;

