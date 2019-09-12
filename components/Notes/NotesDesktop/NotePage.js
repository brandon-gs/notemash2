import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NoteList from './NoteList';
import FormNote from './FormNote';

const NotePage = ({dispatch}) => {

    const [data, setData] = useState(false);
    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        const userId = await axios.post('/api/getUserId');
        const { _id } = userId.data;
        const res = await axios.get('/api/notes/', {
            params: {
                _id
            }
        });
        setNotes(res.data);
        setData(true);
    }

    useEffect(() => {
        if (!data) {
            async function fetchData() {
                const user = await axios.post('/getUser');
                console.log(user);
                await dispatch({
                    type: 'GET_USER',
                    user: user.data
                });
            }
            fetchData();
            getNotes();
        }
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

export default connect()(NotePage);