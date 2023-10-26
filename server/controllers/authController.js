const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

//Register Endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }
        //check if password was entered
        if (!password || password.length < 6) {
            return res.json({
                error: 'password is required and should be 6 character long'
            })
        }
        //check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email Already Exist'
            })
        }
        const hashedPassword = await hashPassword(password)
        // creat user in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.json(user)
    } catch (error) {
        console, log(error)
    }
}

//Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No User Found'
            })
        }

        //check if passsword match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                return res.status(200).send({ user })
            })
        }
        if (!match) {
            res.json({
                error: "Password Do Not Match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//Get User Endpoint
const addNote = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, description } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new note
        const newNote = { title, description };

        // Add the note to the user's notes array
        user.notes.push(newNote);

        // Save the updated user with the new note
        await user.save();

        const updatedUser = await User.findById(userId)

        return res.status(200).send({ msg: "Note Added Successfully..!", notes: updatedUser.notes }); // Respond with the updated user
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllNotes = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId)

        return res.status(200).send({ msg: "Note Added Successfully..!", notes: user.notes }); // Respond with the updated user
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteNote = async (req, res) => {
    try {
        const userId = req.params.userId;
        const noteId = req.params.noteId; // Assuming you pass the note's id in the URL

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the note and remove it
        const noteIndex = user.notes.findIndex(note => note._id.toString() === noteId);

        if (noteIndex === -1) {
            return res.status(404).json({ message: 'Note not found' });
        }

        user.notes.splice(noteIndex, 1); // Remove the note
        await user.save(); // Save the user with the updated notes list

        return res.status(200).json({ message: 'Note Deleted Successfully!' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    registerUser,
    loginUser,
    addNote,
    getAllNotes,
    deleteNote
}
