const { Router } = require('express');
const router = Router();
const { updateNote, getNotes, createNote, deleteNote } = require('../controllers/note.controllers');

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;