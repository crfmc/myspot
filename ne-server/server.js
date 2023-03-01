const express = require('express');
const path = require('path');
const open = require('open');

// Instantiate express app
const app = express();

// Use public directory for corresponding client folder
app.use(express.static(path.join(__dirname, '../esbuild/public')))

// Importing all routes from the [startup] folder
require('./startup/routes')(app);

// Listen to requests on the local server
app.listen(3000, () => {
    console.log('Server listening on PORT: 3000')
});
