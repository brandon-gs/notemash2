const { Router } = require('express');
const router = Router();
const { getNotes } = require('./controllers/notes.controllers');

router.route('/')
    .get(getNotes);

module.exports = router;