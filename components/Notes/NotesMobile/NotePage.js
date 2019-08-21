import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CreateNote from './CreateNote';
import NoteList from './NoteList';
import axios from 'axios';


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

    useEffect(() => {
        if (!data) { getNotes(); }
    });

    return (
        <div>
            <CreateNote getNotes={getNotes} />
            <NoteList notes={notes} getNotes={getNotes}/>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {})(NotePage);