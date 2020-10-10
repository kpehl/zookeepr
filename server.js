// Dependencies
// Express.js
const express = require('express');
// File server for writing to files
const fs = require('fs');
// Path for working with file and directory paths
const path = require('path')
// Animal data in JSON format
const { animals } = require('./data/animals');
// Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Set the port to either be per the environmental variable, or if local, 3001
const PORT = process.env.PORT || 3001;

// Instantiate the server
const app = express()

// Parse incoming string or array data (POST)
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data (POST)
app.use(express.json());

// Define the routes using the modularized files
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Use the public folder for all static http requests (i.e. don't require separate routes for CSS, images, etc.)
app.use(express.static('public'));

// Set up the port for requests (must be last in the file)
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}. Press CTRL C to exit.`)
});