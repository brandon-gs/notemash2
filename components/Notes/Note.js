import React, { useState } from 'react';
import { format, register } from 'timeago.js';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const localeFunc = (number, index, total_sec) => {
    return [
        ['Hace un momento', 'Ahora mismo'],
        ['Hace %s segundos', 'En %s segundos'],
        ['Hace 1 minuto', 'En 1 minuto'],
        ['Hace %s minutos', 'En %s minutos'],
        ['Hace 1 hora', 'En 1 hora'],
        ['Hace %s horas', 'En %s horas'],
        ['Hace 1 día', 'En 1 día'],
        ['Hace %s días', 'En %s días'],
        ['Hace 1 semana', 'En 1 semana'],
        ['Hace %s semanas', 'En %s semanas'],
        ['Hace 1 mes', 'En 1 mes'],
        ['Hace %s meses', 'En %s meses'],
        ['Hace 1 año', 'En 1 año'],
        ['Hace %s años', 'En %s años']
    ][index];
};

register('es_MX', localeFunc);

import ModalNote from './NotesMobile/ModalNote';
import FormNote from './NotesMobile/FormNote'

const Note = ({ getNotes, note_id, title, description, date }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteNote = async () => {
        await axios.delete(`/api/notes/${note_id}`);
        getNotes();
    }

    return (
        <section>
            <ModalNote
                open={open}
                handleClose={handleClose}
                title="Actualizar nota"
                body={
                    <FormNote
                        note_id={note_id}
                        getNotes={getNotes}
                        handleClose={handleClose}
                        action="PUT"
                        textAction="Actualizar nota"
                        titleProp={title}
                        descriptionProp={description}
                        dateProp={date}
                    />
                }
            />
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5 className="justify-content-between">{title}</h5>
                    <button className="btn btn-secondary m-0" onClick={handleOpen}>
                        <EditIcon />
                    </button>
                </div>
                <div className="card-body">
                    <p>
                        {description}
                    </p>
                    <p>
                        {format(date, 'es_MX')}
                    </p>
                </div>
                <div className="card-footer">
                    <button 
                        className="btn btn-danger"
                        onClick={deleteNote}
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Note;