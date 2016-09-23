// ./shared-objects/server.js 
var airbnbApp = require('../../app.js');

var currentlyEditing = "";

module.exports = {
    airbnbApp: airbnbApp,
    currentlyEditing: currentlyEditing
}