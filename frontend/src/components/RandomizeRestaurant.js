import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/RestaurantService";

const Randomizer = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [randomRestaurant, setRandomRestaurant] = useState(null);

  useEffect(() => {
    retrieveRestaurants();
  }, []);

  const retrieveRestaurants = async () => {
    try {
      const response = await RestaurantDataService.getAll();
      setRestaurants(response.data);
      console.log("retrieveRestaurants =>", response.data);
    } catch (error) {
      console.log("Error while retrieving restaurants:", error);
    }
  };

  const getRandomRestaurant = () => {
    if (restaurants.length === 0) {
      // If the list is empty, do nothing
      return;
    }

    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const randomRestaurant = restaurants[randomIndex];
    setRandomRestaurant(randomRestaurant);
  };

  return (
    <div>
      <h3>
        <b>Restaurant List</b>
      </h3>
      {restaurants && (
        <p>
          {restaurants.map((restaurant, index) => (
            <React.Fragment key={index}>
              {restaurant.name}
              {index !== restaurants.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
        </p>
      )}

      <button className="btn btn-md btn-primary mb-2" onClick={getRandomRestaurant}>
        Randomize
      </button>
      
      {randomRestaurant && (<p> {randomRestaurant.name} </p>)}
    </div>
  );
};

export default Randomizer;
