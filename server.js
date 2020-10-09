// Dependencies
// Express.js
const express = require('express');
// Animal data
const { animals } = require('./data/animals');

// Instantiate the server
const app = express()

// A function for filtering JSON data by query
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

// A route for requesting data
app.get('/api/animals', (req,res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
})

// Set up the port for requests
app.listen(3001, () => {
    console.log('API server now on port 3001. Press CTRL C to exit.')
})