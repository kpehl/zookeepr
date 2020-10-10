// Dependencies
const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../lib/animals.js");
const { animals } = require("../data/animals");

// Mock the file system so animals are not written to the JSON file when a test suite is performed
jest.mock('fs');

// A test for creating a new animal object
test("creates an animal object", () => {
  const animal = createNewAnimal(
    { name: "Darlene", id: "jhgdja3ng2" },
    animals
  );

  expect(animal.name).toBe("Darlene");
  expect(animal.id).toBe("jhgdja3ng2");
});

// A test for the filter by query function
test("filters by query", () => {
    // A starting array
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  // A sample query
  const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

  // The array should filtered to one object
  expect(updatedAnimals.length).toEqual(1);
});

// A test for finding an animal by id
test("finds by id", () => {
    // A sample array
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  // test the function by querying with an id number
  const result = findById("3", startingAnimals);

  // the result should be the correct object
  expect(result.name).toBe("Erica");
});

// A test to validate the animal object by whether or not personality traits exist
test("validates personality traits", () => {
    // a sample array with one valid and one invalid object
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  };

  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };

  // run the validateAnimal function
  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  // The results should correctly identify the valid and invalid entries
  expect(result).toBe(true);
  expect(result2).toBe(false);
});