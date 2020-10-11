// Dependencies
const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers");

// Routes used for the Zookeepers API

// A route for requesting zookeeper data by query
router.get("/zookeepers", (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});
// A route for requesting zookeeper data by id
router.get("/zookeepers/:id", (req, res) => {
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});
// A route for posting a new zookeeper
router.post("/zookeepers", (req, res) => {
  req.body.id = zookeepers.length.toString();

  if (!validateZookeeper(req.body)) {
    res.status(400).send("The zookeeper is not properly formatted.");
  } else {
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeeper);
  }
});

// Export the router - making sure there is only one server instance as instantiated in server.js
module.exports = router;