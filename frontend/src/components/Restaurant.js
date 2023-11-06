import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantDataService from "../services/RestaurantDataService";

const Restaurant = props => {
    const { id } = useParams();
    const navigate = useNavigate();

    const intialRestaurantState = {
        id: null,
        name: "",
        cuisinetype: "",
        pricerange:""
    }

    const [currentRestaurant, setCurrentRestaurant] = useState(intialRestaurantState);
    const [message, setMessage] = useState("");

    const getRestaurant = id => {
        RestaurantDataService.get(id)
            .then(response => {
            setCurrentRestaurant(response.data);
        })
        .catch(e => {
            console.info(e);
        });
    };

    useEffect(() => {
        if (id)
            getRestaurant(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentRestaurant({ ...currentRestaurant, [name]: value });
    };

    const updateRestaurant = () => {
        RestaurantDataService.update(currentRestaurant.id, currentRestaurant)
        .then(response => {
            setMessage("This restaurant was updated successfully!");
        })
        .catch(e => {
            console.info(e);
        });
    };

    const deleteRestaurant = () => {
        RestaurantDataService.delete(currentRestaurant.id)
        .then(response => {
            navigate("/Restaurants");
        })
        .catch(e => {
            console.info(e);
        });
    };
    return (
        <div className="col-md-6">
          {currentRestaurant ? (
            <div className="edit-form">
              <h4>Restaurant</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    data-testid="restaurant-name"
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={currentRestaurant.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cuisinetype">Cuisine Type</label>
                  <input
                    data-testid="cuisine-type"
                    type="text"
                    className="form-control"
                    id="cuisinetype"
                    name="cuisinetype"
                    value={currentRestaurant.cuisinetype}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pricerange">Price Range</label>
                  <input
                    data-testid="restaurant-price-range"
                    type="text"
                    className="form-control"
                    id="pricerange"
                    name="pricerange"
                    value={currentRestaurant.pricerange}
                    onChange={handleInputChange}
                  />
                </div>
                </form> 
    
              <button 
                className="btn btn-sm btn-danger"
                onClick={deleteRestaurant}>
                Delete
              </button>
    
              <button
                 className="m-1 btn btn-sm btn-success"
                type="submit"
                onClick={updateRestaurant}
              >
                Update
              </button>
              <p>{message}</p>
            </div>
            
          ) : (
            <div>
              <br />
              <p>Please click on a Restaurant...</p>
            </div>
          )}
        </div>
      );
    };

export default Restaurant;