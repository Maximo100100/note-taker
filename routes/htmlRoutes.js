//require path to find html dynamically 
const path = require("path");
// use .Router to route the html files 
const router = require("express").Router();

// route notes.html to /notes 
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// default route is index.html
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
