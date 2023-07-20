module.exports = app => {
    const restaurants = require("../controllers/restaurant.controller.js");

    const router = require("express").Router();

    router.post("/", restaurants.create);
    
    router.get("/",restaurants.findAll);

    router.get("/:id", restaurants.findOne);

    router.put("/:id", restaurants.update)

    router.delete("/:id", restaurants.delete);

    router.delete("/",restaurants.deleteAll);

    app.use('/api/restaurants', router);
};