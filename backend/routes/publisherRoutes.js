const express = require("express");
const router = express.Router();
const {publishers} = require("../dataStore")


// Retrieve all publishers
router.get("/", (req, res) => {
  res.json(publishers);
});

// Create a new publisher
router.post("/", (req, res) => {
  const { publisher, domains } = req.body;
  const exists = publishers.some((pub) => pub.publisher === publisher);
  if (exists) {
    return res.status(409).send("Publisher name already exists");
  }

  const newPublisher = { publisher, domains: domains || [] };
  publishers.push(newPublisher);
  res.status(201).json(newPublisher);
});

// Update a specific publisher
router.put("/:name", (req, res) => {
  const { name } = req.params;

  const { newName, domains } = req.body;
  const publisher = publishers.find((p) => p.publisher === name);

  if (publisher) {
    const isNameExist = publishers.some(
      (p) => p.publisher === newName && newName !== name
    );
    if (!isNameExist) {
      publisher.publisher = newName || publisher.publisher;
      publisher.domains = domains || publisher.domains;
      res.json(publisher);
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
  const index = publishers.findIndex((p) => p.publisher === name);
  if (index !== -1) {
    publishers.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Publisher not found");
  }
});

module.exports = router;
