const express = require("express");
const path = require("path");
const notesData = require("./Develop/db/db.json");

// server set up
const PORT = 3001;
const app = express();

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});
app.get("/api/terms", (req, res) => res.json(notesData));

app.listen(PORT, () => console.log(`Note Taker App Running.`));
