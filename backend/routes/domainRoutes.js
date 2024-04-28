const express = require("express");
const router = express.Router();
const {publishers} = require("../dataStore")

// Retrieve all domains
router.get("/", (req, res) => {
  let allDomains = [];
  publishers.forEach(pub => {
    pub.domains.forEach(domain => {
      if (!allDomains.some(d => d.domain === domain.domain)) {
        allDomains.push(domain);
      }
    });
  });
  res.json(allDomains);
});

router.get('/check-unique', (req, res) => {
  const { name } = req.query;
  const domainExists = publishers.some(publisher =>
    publisher.domains.some(domain => domain.domain.toLowerCase() === name.toLowerCase())
  );

  res.json(!domainExists);
});

// Create a new domain
router.post("/", (req, res) => {
  const { domain, desktopAds, mobileAds, publisher } = req.body;
  
  const domainExists = publishers.some(publisher => 
    publisher.domains.some(dom => dom.domain === domain));

  if (domainExists) {
    return res.status(409).send("Domain name already exists in the system");
  }

  const publisherObj = publishers.find(pub => pub.publisher === publisher);
  if (!publisherObj) {
    return res.status(404).send("Publisher not found");
  }

  if (desktopAds < 0 || mobileAds < 0) {
    return res.status(400).send("desktopAds and mobileAds must be positive numbers");
  }

  publisherObj.domains.push({ domain, desktopAds, mobileAds });
  res.status(201).json({ domain, desktopAds, mobileAds });
});


// Update a specific publisher's domain
router.put("/:oldName", (req, res) => {
  const { oldName, newName, desktopAds, mobileAds, publisherName } = req.body;

  const publisher = publishers.find(pub => pub.publisher === publisherName);
  if (!publisher) {
    return res.status(404).send("Publisher not found");
  }

  if (desktopAds < 0 || mobileAds < 0) {
    return res.status(400).send("desktopAds and mobileAds must be positive numbers");
  }

  const domainIndex = publisher.domains.findIndex(domain => domain.domain === oldName);
  if (domainIndex === -1) {
    return res.status(404).send("Domain not found");
  }

  const domainExists = publishers.some(publisher => 
    publisher.domains.some(dom => dom.domain === newName));

  if (domainExists) {
    return res.status(409).send("New domain name already exists within another publisher");
  }

  publisher.domains[domainIndex] = { domain: newName, desktopAds, mobileAds };
  res.json({ domain: newName, desktopAds, mobileAds });
});


// Delete a specific publisher domain
router.delete("/:name", (req, res) => {
  const { domainName, publisherName } = req.body;

  const publisher = publishers.find(pub => pub.publisher === publisherName);
  if (!publisher) {
    return res.status(404).send("Publisher not found");
  }

  const domainIndex = publisher.domains.findIndex(domain => domain.domain === domainName);

  if (domainIndex !== -1) {
    publisher.domains.splice(domainIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Domain not found");
  }
});


module.exports = router;
