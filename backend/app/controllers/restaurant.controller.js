const db = require("../models");
const Restaurant = db.restaurants;
const Op = db.Sequelize.Op;

// create an save new restaurant
exports.create = (req, res) => {
    // validate request
    console.log("req =>", req.body)
    if (!req.body.name) {
        res.status(400).send({
            message: `Content can not be empty!`
        });
        return;
    }

    // create restaurant
    const restaurant = {
        name: req.body.name,
        cuisinetype: req.body.cuisinetype,
    }

    // save restaurant in database
    Restaurant.create(restaurant)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while creating the restaurant`
            });
        });
};

// retrieve all restaurants from db
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null

    Restaurant.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || `Some error occured while retrieving restaurant.`
            })
        })
};

// find single restaurant w/ id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Restaurant.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.statis(404).send({ 
                    message: `Cannot find Restaurant with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Restaurant with id ${id}`
            })
        })
};

// update restaurant by id in request
exports.update = (req, res) => {
    const id = req.params.id;

    Restaurant.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Restaurant was successfully updated.`
                });
            } else {
                res.send({
                    message: `Cannot update restaurant with id=${id}`
                });
            }
        })
        .catch( err => {
            res.status(500).send({
                message: `Error updating restaurant wihh id = ${id}`
            })
        })

};

// delete restaurant w/ specified id
exports.delete = (req, res) => {
    console.log("req =>", req);
    const id = req.params.id;
    console.log("id => ", id);

    Restaurant.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: `Restaurant was deleted successfully!`
            });
        } else {
            res.send({
                message: `Cannot delete restaurant with id=${id}`
            });
        }
    })
};

// delete all restaurants
exports.deleteAll = (req, res) => {
    Restaurant.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Restaurant(s) were successfully deleted!`})
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Some error occurred while removing all rsturants`
        })
    })
};
