// Import routes
const index = require('../routes/index');
const welcome = require('../routes/welcome');
const spot = require('../routes/spot');
const callback = require('../routes/callback');

// Export modules with routes
module.exports = (app) => {
    app.get("/", index);
    app.get("/welcome", welcome);
    app.get("/spot/login", spot.login);
    app.get("/spot/callback", spot.callback);
    app.get("/callback", callback);
}