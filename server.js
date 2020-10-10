// Dependencies
// Express.js
const express = require('express');
// File server for writing to files
const fs = require('fs');
// Path for working with file and directory paths
const path = require('path')
// Animal data in JSON format
const { animals } = require('./data/animals');

// Set the port to either be per the environmental variable, or if local, 3001
const PORT = process.env.PORT || 3001;

// Instantiate the server
const app = express()

// Parse incoming string or array data (POST)
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data (POST)
app.use(express.json());

// A function for filtering JSON data by query (GET)
function filterByQuery(query, animalsArray) {
    // set the filtered results array to equal the incoming animal array
    let filteredResults = animalsArray;
    // Filter based on diet
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    // Filter based on species
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    // Filter based on name
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // Filter based on personality trait.  These are in a nested array.
    // Set up an empty array for personality traits for the query
    let personalityTraitsArray = [];
    // Filter the results array
    if (query.personalityTraits) {
        // if the query is a single trait, a string, place the value into 
        //the array, otherwise, save the query array as the search array
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
    }
    // Loop through each queried trait in the personality traits array
    personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filtered results array.
        // With each loop any animal that doesn't have the queried trait will
        // be filtered out, leaving an array with just animals with all 
        // queried traits.
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
    });
    // Return the filtered result array so it can be displayed
    return filteredResults;
}

// A function for filtering the JSON data by a single animal ID (GET)
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// A function for creating a new animal (POST)
function createNewAnimal(body, animalsArray) {
    // set the animal to the input text
    const animal = body;
    // add the animal to the array
    animalsArray.push(animal);
    // write to the json file, without editing any existing data, and with whitespace for readability
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    // return the new animal to the post route for response
    return animal;
}

// A function for validating a new animal (POST)
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

// A route for requesting animal data by query
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});
// A route for requesting animal data by id
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});
// A route for posting a new animal
app.post('/api/animals', (req, res) => {
    // set the id for the new animal based on what the next index of the array will be
    req.body.id = animals.length.toString();
    // validate the new animal data, and if anything in the req.body is incorrect, send back a 400 error "Bad Request"
    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to json file and animals array with createNewAnimal()
        const animal = createNewAnimal(req.body, animals);
        // send the response (new animal) in json format back to the client
        res.json(req.body);
    }
});

// Set up the port for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}. Press CTRL C to exit.`)
});