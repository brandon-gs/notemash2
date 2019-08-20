import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const FormNote = ({ handleClose, textAction }) => {

    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onChangeDate = date => {
        setDate(date);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(`
            title: ${title}
            description: ${description}
            date: ${date}
        `)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Título:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">Descripción:</label>
                <textarea 
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
                />
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                >
                    Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                    {textAction}
                </button>
            </div>
        </form>
    )
}

export default FormNote;