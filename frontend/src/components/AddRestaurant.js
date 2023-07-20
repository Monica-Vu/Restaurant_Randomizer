import React, { useState } from "react";
import RestaurantDataService from "../services/RestaurantService";

const AddRestaurant = () => {
    const intialRestaurantState = {
        id: null,
        name: "",
        cuisinetype: ""
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
            cuisinetype: restaurant.cuisinetype
        };

        RestaurantDataService.create(data)
            .then(response => {
                setRestaurant({
                    id: response.data.id,
                    name: response.data.name,
                    cuisinetype: response.data.cuisinetype
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

                <button onClick={saveRestaurant} className="btn btn-success">
                Submit
                </button>
            </div>
        )}
        </div>
    );
};

export default AddRestaurant;
