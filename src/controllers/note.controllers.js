const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req, res) => {
    const {_id} = req.query;
    const notes = await Note.find({user_id: _id});
    res.json(notes);
}

notesCtrl.getNote = async (req, res) => {
    res.json(req.body)
}

notesCtrl.createNote = async (req, res) => {
    const { title, description, date, user_id } = req.body;
    const newNote = new Note({
        title,
        description,
        date,
        user_id
    });
    await newNote.save();
    res.json({ message: 'Note saved' });
}

notesCtrl.updateNote = async (req, res) => {
    const { title, description, date, user_id } = req.body;
    await Note.findOneAndUpdate({_id: req.params.id}, {
        title,
        description,
        date,
        user_id
    })
    res.json("Note updated");
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findOneAndDelete({_id: req.params.id});
    res.json("Note deleted");
}

module.exports = notesCtrl;