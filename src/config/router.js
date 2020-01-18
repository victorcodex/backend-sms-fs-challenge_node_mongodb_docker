const locationController = require('./../location/location.controller');

/**
 * Primary app routes.
 */
module.exports = (app) => {
  app.post('/location/create', locationController.create); // Create a Location

  app.get('/locations', locationController.find); // Find many Location

  app.get('/location/:id', locationController.findOne); // Find a Location

  app.put('/location/:id', locationController.update); // Update a Location by Id

  app.delete('/location/:id', locationController.destroy); // Delete a Location by Id
};
