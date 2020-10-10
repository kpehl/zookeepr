// Dependencies
// File server for writing to files
const fs = require('fs');
// Path for working with file and directory paths
const path = require('path')


// Functions for the server.js animal routes

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
        path.join(__dirname, '../data/animals.json'),
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

// Export the functions for use in server.js
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
  };