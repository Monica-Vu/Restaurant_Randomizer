import React, { useState } from "react";
import RestaurantDataService from "../services/RestaurantService";

const AddRestaurant = () => {
    const intialRestaurantState = {
        id: null,
        name: "",
        cuisinetype: "",
        pricerange: ""
    };

    const [restaurant, setRestaurant] = useState(intialRestaurantState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRestaurant({ ...restaurant, [name]: value})
    };

    const saveRestaurant = () => {
        let data = {
            name: restaurant.name,
            cuisinetype: restaurant.cuisinetype,
            pricerange: restaurant.pricerange
        };

        RestaurantDataService.create(data)
            .then(response => {
                setRestaurant({
                    id: response.data.id,
                    name: response.data.name,
                    cuisinetype: response.data.cuisinetype,
                    pricerange: response.data.pricerange
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    
    const newRestaurant = () => {
        setRestaurant(intialRestaurantState);
        setSubmitted(false);
    };

    return (
    <div className="submit-form"> 
        {submitted ? (
            <div>
                <h4>You submitted successfully</h4>
                <button className="btn btn-success" onClick={newRestaurant}> 
                    Add
                </button>
            </div>
        ) : (
            <div> 
                <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={restaurant.name}
                    onChange={handleInputChange}
                    name="name"
                    /> 
                </div>

                <div className="form-group">
                <label htmlFor="description">Cuisine Type</label>
                <input 
                    type="text"
                    className="form-control"
                    id="cuisinetype"
                    required 
                    value={restaurant.cuisinetype}
                    onChange={handleInputChange}
                    name="cuisinetype"
                    /> 
                </div>

                <div className="form-group">
                <label htmlFor="description">Price Range</label>
                <input 
                    type="text"
                    className="form-control"
                    id="ricerange"
                    required 
                    value={restaurant.pricerange}
                    onChange={handleInputChange}
                    name="pricerange"
                    /> 
                </div>

                <button onClick={saveRestaurant} className="my-2 btn btn-success">
                Submit
                </button>
            </div>
        )}
        </div>
    );
};

export default AddRestaurant;
