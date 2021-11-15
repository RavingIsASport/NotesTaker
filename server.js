const express = require("express");
const path = require("path");
const api = require("./routes/api");
// server set up
const PORT = process.env.PORT || 3001;
const app = express();

// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", api);

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
// app
//   .route("/api")
//   .get(function (req, res) {
//     res.json(data);
//   })
//   .post(function (req, res) {
//     const newNote = req.body;
//     newNote.id = uuid;
//     let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     data.push(newNote);
//     // write to db
//     fs.writeFileSync("./db/db.json", JSON.stringify(data));
//     // console.log
//     console.log("new note added");
//     // Log the response body to the console
//     res.json(data);
//   });
// api.get("/api/notes", (req, res) => {
//   console.info(`${req.method} request received for notes`);
//   readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
// });

app.get("/api/notes/:id", function (req, res) {
  var data = JSON.parse(fs.readFile("./db/db.json", "utf8"));
  res.json(data[Number(req.params.id)]);
});
// app.post("/api/notes", (req, res) => {
//   const newNote = req.body;
//   newNote.id = uuid;
//   let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//   data.push(newNote);
//   // write to db
//   fs.writeFileSync("./db/db.json", JSON.stringify(data));
//   // console.log
//   console.log("new not added");
//   // Log the response body to the console
//   res.json(data);
// });

app.listen(PORT, () => console.log(`Note Taker App Running.`));
