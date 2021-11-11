const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");
// server set up
const PORT = 3001;
const app = express();

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API Notes
app.get("/api/notes", (req, res) => {
  fs.readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.get("/api/notes/:id", function (req, res) {
  var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(data[Number(req.params.id)]);
});
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid;
  let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  data.push(newNote);
  // write to db
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
  // console.log
  console.log("new not added");
  // Log the response body to the console
  res.json(data);
});

app.listen(PORT, () => console.log(`Note Taker App Running.`));
