const db = require("../models");
const Recipe = db.recipes;
const Op = db.Sequelize.Op;

// create an save new recipe
exports.create = (req, res) => {
    // validate request
    console.log("req =>", req.body)
    if (!req.body.name) {
        res.status(400).send({
            message: `Content can not be empty!`
        });
        return;
    }

    // create recipe
    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
    }

    // save recipe in database
    Recipe.create(recipe)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while creating the recipe`
            });
        });
};

// retrieve all recipes from db
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null

    Recipe.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || `Some error occured while retrieving recipes.`
            })
        })
};

// find single recipe w/ id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recipe.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.statis(404).send({ 
                    message: `Cannot find Recipe with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Recipe with id ${id}`
            })
        })
};

// update recipes by id in request
exports.update = (req, res) => {
    const id = req.params.id;

    Recipe.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Recipe was successfully updated.`
                });
            } else {
                res.send({
                    message: `Cannot update Recipe with id=${id}`
                });
            }
        })
        .catch( err => {
            res.status(500).send({
                message: `Error updating Recipe wihh id = ${id}`
            })
        })

};

// delete recipe w/ specified id
exports.delete = (req, res) => {
    console.log("req =>", req);
    const id = req.params.id;
    console.log("id => ", id);

    Recipe.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: `Recipe was deleted successfully!`
            });
        } else {
            res.send({
                message: `Cannot delete Recipe with id=${id}`
            });
        }
    })
};

// delete all recipes
exports.deleteAll = (req, res) => {
    Recipe.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Recipes were successfully deleted!`})
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Some error occurred while removing all recipes`
        })
    })
};
