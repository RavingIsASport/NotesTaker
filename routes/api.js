const express = require("express");
const router = express.Router();
const dataB = require("../db/db.json");
const uuid = require("../helpers/uuid");
const fs = require("fs");

// notes rout
router
  .route("/notes")
  .get(function (req, res) {
    fs.readFileSync("./db/db.json", "utf-8");
    res.json(dataB);
  })
  .post(function (req, res) {
    const newNote = req.body;
    newNote.id = uuid;
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    data.push(newNote);
    // write to db
    fs.writeFileSync("./db/db.json", JSON.stringify(data));

    // console.log
    console.log("new note added");
    // Log the response body to the console
    res.json(data);
  });

module.exports = router;
