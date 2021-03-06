import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Note from '../Note';

const NoteList = ({ notes, getNotes }) => {
    return (
        <article className="row m-0 p-0">
            {
                notes.map(note => {
                    const { _id, user_id, title, description, date } = note;
                    return (
                        <section className="col-md-6 p-2" key={_id}>
                            <Note
                                note_id={_id}
                                title={title}
                                description={description}
                                date={date}
                                user_id={user_id}
                                getNotes={getNotes}
                            />
                        </section>
                    )
                })
            }
        </article>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {})(NoteList);