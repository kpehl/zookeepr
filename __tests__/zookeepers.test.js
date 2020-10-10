// Dependencies
const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

// Mock the file system so the JSON file is not altered during testing
jest.mock("fs");

// Test the function to create a new zookeeper object
test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "jhgdja3ng2" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("jhgdja3ng2");
});

// Test the filter by query function
test("filters by query", () => {
    // a sample array
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  // run the function testing an age query
  const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

  // expect the result to be the one filtered object
  expect(updatedZookeepers.length).toEqual(1);
});

// Test the find by ID function
test("finds by id", () => {
    // a sample array
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  // run the function with an id
  const result = findById("3", startingZookeepers);

  // expect the filter to provide the proper object
  expect(result.name).toBe("Isabella");
});

// Test the zookeeper validation function by testing with an invalid age
test("validates age", () => {
    // a sample array with a string instead of a number for one age
  const zookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };

  const invalidZookeeper = {
    id: "3",
    name: "Isabella",
    age: "67",
    favoriteAnimal: "bear",
  };

  // run the function on the two objects
  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  // expect the function to identify the valid and invalid objects
  expect(result).toBe(true);
  expect(result2).toBe(false);
});