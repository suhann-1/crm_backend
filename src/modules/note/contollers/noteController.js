// controllers/note.controller.js
const Note = require("../model/Note");
const Customer = require('../../customers/model/Customer');


//  Add a new note
exports.addNote = async (req, res) => {
  try {
    const { customerId, content, followUpDate } = req.body;

    // ensure customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const note = new Note({ customerId, content, followUpDate });
    await note.save();

    res.status(201).json({ message: "Note added successfully", note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get all notes for a specific customer
exports.getNotesByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const notes = await Note.find({ customerId }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update note status (Pending → Completed)
exports.updateNoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const note = await Note.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note status updated", note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get all pending followups 
exports.getPendingFollowUps = async (req, res) => {
  try {
    const today = new Date();

    const pendingNotes = await Note.find({
      status: "Pending",
      followUpDate: { $lte: today }
    }).populate("customerId", "name email phone");

    res.json(pendingNotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};