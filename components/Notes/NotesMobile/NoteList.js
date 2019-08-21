import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Note from '../Note';

const NoteList = ({ notes, getNotes }) => {

    return (
        <div className="table-responsive mb-5">
            <div className="mb-5">
                <article>
                    <div className="card-deck">
                        {
                            notes.map(note => {
                                const { _id, user_id, title, description, date } = note;
                                return (
                                    <section key={_id}>
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
                    </div>
                </article>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(NoteList);