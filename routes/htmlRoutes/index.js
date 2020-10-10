// Dependencies
const router = require('express').Router();
// Path for working with file and directory paths
const path = require('path')


// Routes for serving the html pages

// A route for serving the index page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
// A route for serving the animals page
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
// A route for serving the zookeepers page
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// Export the router - making sure there is only one server instance as instantiated in server.js
module.exports = router;