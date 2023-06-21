const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const dbp =path.join(__dirname, '/db/db.json');
const PORT = 3001;
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => res.send('Visit http://localhost:3001/api'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });app.get('/api/notes', (req, res) => {
    fs.readFile(dbp, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // Assign a unique id to the note
    fs.readFile(dbp, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbp, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    res.status(201).end();
});
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
