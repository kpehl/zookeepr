// Dependencies
const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// Routes used for the Animals API

// A route for requesting animal data by query
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});
// A route for requesting animal data by id
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});
// A route for posting a new animal
router.post('/animals', (req, res) => {
    // set the id for the new animal based on what the next index of the array will be
    req.body.id = animals.length.toString();
    // validate the new animal data, and if anything in the req.body is incorrect, send back a 400 error "Bad Request"
    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to json file and animals array with createNewAnimal()
        const animal = createNewAnimal(req.body, animals);
        // send the response (new animal) in json format back to the client
        res.json(animal);
    }
});

// Export the router - making sure there is only one server instance as instantiated in server.js
module.exports = router;