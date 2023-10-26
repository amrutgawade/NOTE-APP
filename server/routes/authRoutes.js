const express = require('express');
const cors = require('cors');
const router = express.Router();
const { registerUser, loginUser, addNote, getAllNotes, deleteNote } = require('../controllers/authController')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/', loginUser)
router.post('/register', registerUser)
router.post('/home/:userId/notes', addNote)
router.get('/:userId/notes', getAllNotes)
router.delete('/:userId/:noteId/notes', deleteNote)

module.exports = router