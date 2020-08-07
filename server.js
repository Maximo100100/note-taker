const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    return res.send(addNote(req.body, notes));
});

// updates db.json
function updateNotes(notesArr) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArr, null, 2)
    );
}

// add a note
function addNote(newNote, notesArr) {
    notesArr.push(newNote);

    if(!notesArr.every(note => note.title && note.text && note.id && (Object.keys(note).length == 3))) {
        return {
            "error": {
              "code": 400,
              "message": "Invalid object input."
            }
        };
    }

    updateNotes(notesArr);
    return notesArr;
}

// delete a note
function deleteNote(id, notesArr) {
    const index = notesArr.findIndex(note => note.id == id);
    if(index == -1) {
        return {
            "error": {
              "code": 404,
              "message": "Object not found."
            }
        };
    }
    notesArr.splice(index, 1);
    updateNotes(notesArr);

    return notesArr;
}
