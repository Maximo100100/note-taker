// I found a method using util to handle internal APIs 
const util = require("util");
const fs = require("fs");
// use uuid to give all objects in the json a unique id 
const { v4: uuidv4 } = require('uuid');

// use util to easily handle reading and writing 
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Method to write to json using a constructor
class Store {
  read() {
    return readFile("db/db.json", "utf8");
  }
  write(note) {
    return writeFile("db/db.json", JSON.stringify(note));
  }
  // Tries to find notes if there are no notes the catch makes one 
  getNotes() {
    return this.read().then(notes => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      }
      catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNote(note) {
    //make new note from input
    const { title, text } = note;

    // use uuid to give unique id 
    const newNote = { title, text, id: uuidv4() };

    // adds new note to the end of the array 
    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  }

  // finds note in json and filters it out of the file by its id
  removeNote(id) {
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !== id))
      // then writes filtered result  
      .then(filtNotes => this.write(filtNotes));
  }
}

module.exports = new Store();