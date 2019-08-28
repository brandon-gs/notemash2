import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import NoteList from './NoteList';
import FormNote from './FormNote';

const NotePage = ({ user }) => {

    const [data, setData] = useState(false);
    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        const { _id } = user;
        const res = await axios.get('/api/notes/', {
            params: {
                _id
            }
        });
        setNotes(res.data);
        setData(true);
    }

    useEffect(async () => {
        if (!data) { await getNotes(); }
    });

    // La clase cards-notes hace que la pagina sea responsive

    return (
        <div className="container">
            <div className="cards-notes">
                <div className="row">
                    <div className="col-md-4 m-0 p-0">
                        <FormNote
                            getNotes={getNotes}
                            textAction="Guardar nota"
                        />
                    </div>
                    <div className="col-md-8 m-0">
                        <NoteList 
                            notes={notes}
                            getNotes={getNotes}
                        />
                    </div>
                </div>  
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {})(NotePage);