const express = require("express");
const bodyParser = require("body-parser");               
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse json
app.use(bodyParser.json())

const db = require("./app/models")
db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome~ Get started by entering some recipes. "})
});

require("./app/routes/recipe.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `);
});