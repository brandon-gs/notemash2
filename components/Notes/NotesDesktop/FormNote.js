import React, { useState } from 'react';
import { connect } from 'react-redux';

import { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es)

import DatePicker from 'react-datepicker';

import axios from 'axios';

const FormNote = ({ titleProp, descriptionProp, dateProp, getNotes, user, action, textAction, note_id }) => {

    const isEditing = action === "PUT" ? true : false;

    const startDate = isEditing ? new Date(dateProp) : new Date();
    const startTitle = isEditing ? titleProp : '';
    const startDescription = isEditing ? descriptionProp : '';

    const [date, setDate] = useState(startDate);
    const [title, setTitle] = useState(startTitle);
    const [description, setDescription] = useState(startDescription);

    const onChangeDate = date => {
        setDate(date);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const newNote = {
            title,
            description,
            date,
            user_id: user._id
        }
        if (action === "PUT") {
            await axios.put(`/api/notes/${note_id}`, newNote);
        } else {
            await axios.post('/api/notes', newNote);
        }
        getNotes();
    }

    return (
        <section className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Título:</label>
                        <input
                            autoFocus
                            value={title}
                            type="text"
                            className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Descripción:</label>
                        <textarea
                            value={description}
                            className="form-control"
                            onChange={e => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className="form-group">
                        <DatePicker
                            className="form-control"
                            selected={date}
                            onChange={onChangeDate}
                            locale="es"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            {textAction}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {})(FormNote);