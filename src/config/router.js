const locationController = require('./../controllers/location')

/**
 * Primary app routes.
 */
module.exports = (app) => {
  app.post("/locations/create", locationController.create) //Create a Location
  
  app.get("/locations", locationController.find) //Find many Location
  
  app.get("/locations/:id", locationController.findOne) //Find a Location
  
  app.put("/locations/:id/update", locationController.update) //Update a Location by Id
  
  app.delete("/locations/:id/delete", locationController.destroy) //Delete a Location by Id
}