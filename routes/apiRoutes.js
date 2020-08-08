// require .Router() method to do routing with express 
const router = require("express").Router();
const db = require("../db/db");

// tell server to get json if err give 500 response (Internal server error)
router.get("/notes", function(req, res) {
  db
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

// use .post to add the note to body "note" is the single note added 
router.post("/notes", (req, res) => {
  db
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

// delete note using req.params.id each note id should be different (uuid) 
router.delete("/notes/:id", function(req, res) {
  db
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
