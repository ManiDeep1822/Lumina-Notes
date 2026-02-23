const notesModel = require("../models/notes.model");

const getNotes = async (req, res) => {
  try {
    const notes = await notesModel.find();

    if (!notes) {
      return res.status(500).json({ message: "Internal Error" });
    }

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const notes = await notesModel.create({
      title: title,
      content: content,
    });

    res.json({
      notesId: notes._id,
      title: notes.title,
      content: notes.content,
      message: "Notes created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateNotes = async (req, res) => {
  try {
    const notes = await notesModel.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { returnDocument: "after" },
    );

    if (!notes) {
      return res.status(400).json({ message: "Notes id is wrong" });
    }

    res.json({
      notesId: notes._id,
      newTitle: notes.title,
      newContent: notes.content,
      message: "Notes updated",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const note = await notesModel.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getSingleNote = async (req, res) => {
  try {
    const note = await notesModel.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getSingleNote,
};
