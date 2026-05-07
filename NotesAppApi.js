require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Imports
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");
const Note = require("./models/Note");

// Middlewares
app.use(cors({
  origin: "https://your-frontend.vercel.app"
}));
app.use(express.json());

// Routes
app.use(authRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.log("Error:", err.message));

// Test Route
app.get("/", (req, res) => {
    res.send("Notes App Running");
});

// PROTECTED NOTES ROUTES


// CREATE NOTE
app.post("/notes", auth, async (req, res) => {
    try {
        const { type, content } = req.body;

        if (!type || !content) {
            return res.status(400).json({
                success: false,
                message: "Type and content required",
            });
        }

        const note = await Note.create({
            type,
            content,
            userId: req.user.id 
        });

        res.status(201).json({
            success: true,
            message: "Note created",
            data: note
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create note",
        });
    }
});


//  GET ALL NOTES (ONLY USER'S)
app.get("/notes", auth, async (req, res) => {
    try {
        const data = await Note.find({ userId: req.user.id });

        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            data: data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching notes",
        });
    }
});


//  GET SINGLE NOTE
app.get("/notes/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID"
            });
        }

        const note = await Note.findOne({
            _id: id,
            userId: req.user.id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.json({
            success: true,
            data: note
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching note"
        });
    }
});


// UPDATE NOTE
app.put("/notes/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { type, content } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { type, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.json({
            success: true,
            message: "Note updated",
            data: updatedNote
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Update failed"
        });
    }
});


// DELETE NOTE
app.delete("/notes/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Note.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.json({
            success: true,
            message: "Note deleted"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Delete failed"
        });
    }
});


const PORT = process.env.PORT || 3047;

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});