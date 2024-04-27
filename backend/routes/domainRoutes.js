const express = require("express");
const router = express.Router();

let publishers = []; // Array of publisher names

// Retrieve all publishers
router.get("/", (req, res) => {
  res.json(publishers);
});

// Create a new publisher
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!publishers.includes(name)) {
    publishers.push(name);
    res.status(201).json({ name });
  } else {
    console.log(publishers);
    res.status(409).send("Publisher name already exists");
  }
});

// Update a specific publisher
router.put("/:oldName", (req, res) => {
  const { oldName } = req.params;
  const { newName } = req.body;
  const index = publishers.indexOf(oldName);
  if (index !== -1) {
    if (!publishers.includes(newName)) {
      publishers[index] = newName;
      res.json({ newName });
    } else {
      res.status(409).send("New publisher name already exists");
    }
  } else {
    res.status(404).send("Publisher not found");
  }
});

// Delete a specific publisher
router.delete("/:name", (req, res) => {
  const { name } = req.params;
  const index = publishers.indexOf(name);
  if (index !== -1) {
    publishers.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Publisher not found");
  }
});

module.exports = router;
