// routes/note.routes.js
const express = require("express");
const router = express.Router();
const noteController = require("../contollers/noteController");

// Add note
router.post("/addnotes", noteController.addNote);

// Get all notes for a customer
router.get("/:id", noteController.getNotesByCustomer);

// Update note status
router.put("/:id/status", noteController.updateNoteStatus);

router.delete("/:id/delete", noteController.deleteNote);
// Get pending follow-ups
router.get("/pending", noteController.getPendingFollowUps);

module.exports = router;
