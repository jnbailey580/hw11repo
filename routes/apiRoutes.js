var routers = require("express").Router();
var store = require("../db/db.json");


routers.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

routers.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});


routers.delete("/notes/:id", (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

app.get("/api/notes", function(req, res) {
  // Read the db.json file and return all saved notes as JSON.
  res.json(notes);
});

// Setup the /api/notes post route
app.post("/api/notes", function(req, res) {
  // Receives a new note, adds it to db.json, then returns the new note
  let newNote = req.body;
  notes.push(newNote);
  updateDb();
  return console.log("Added new note: "+newNote.title);
});

// Retrieves a note with specific id
app.get("/api/notes/:id", function(req,res) {
  // display json for the notes array indices of the provided id
  res.json(notes[req.params.id]);
});

// Deletes a note with specific id
app.delete("/api/notes/:id", function(req, res) {
  notes.splice(req.params.id, 1);
  updateDb();
  console.log("Deleted note with id "+req.params.id);
});


        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Display index.html when all other routes are accessed
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }


module.exports = routers;
