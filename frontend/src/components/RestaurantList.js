import React, { useState, useEffect } from "react"
import RestaurantDataService from "../services/RestaurantDataService"
import { Link } from "react-router-dom"

const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveRestaurants();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(e => {
                console.info(e);
            });
    };

    const refreshList = () => {
        retrieveRestaurants();
        setCurrentRestaurant(null);
        setCurrentIndex(-1);
    };

    const setActiveRestaurant = (restaurant, index) => {
        setCurrentRestaurant(restaurant);
        setCurrentIndex(index);
    };

    const removeAllRestaurants = () => {
        RestaurantDataService.deleteAll()
            .then(response => {
                refreshList();
            })
            .catch(e => {
                console.info(e);
            });
    };

    const findByName = () => {
        RestaurantDataService.findByName(searchName)
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(e => {
                console.info(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8 p-2">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search By Name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4> Restaurants List </h4>

                <ul className="list-group">
                    {restaurants &&
                        restaurants.map((restaurant, index) => (
                            <li
                                className={
                                    "list-group-item" +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveRestaurant(restaurant, index)}
                                key={index}
                            >
                                {restaurant.name}
                            </li>
                        ))}
                </ul>
                <button
                    className="my-2 btn btn-sm btn-danger"
                    onClick={removeAllRestaurants}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentRestaurant ? (
                    <div>
                        <h4>Restaurant</h4>
                        <div>
                            <label>
                                <strong> Name:  </strong>
                            </label> 
                            {currentRestaurant.name}
                        </div>
                        <div>
                            <label>
                                <strong>Cuisine Type: </strong>
                            </label>
                            {currentRestaurant.cuisinetype}
                        </div>

                        <div>
                            <label>
                                <strong>Price Range: </strong>
                            </label>
                            {currentRestaurant.pricerange}
                        </div>
                        <Link 
                            to={"/restaurants/" + currentRestaurant.id}
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p> Please click on a Restaurant...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantsList;