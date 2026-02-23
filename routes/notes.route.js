const express = require("express");
const {
  getNotes,
  createNotes,
  getSingleNote,
  updateNotes,
  deleteNotes,
} = require("../controllers/notes.controller");

const router = express.Router();

router.route("/notes").get(getNotes).post(createNotes);

router
  .route("/notes/:id")
  .get(getSingleNote)
  .put(updateNotes)
  .delete(deleteNotes);

module.exports = router;
