import React, { useState, useEffect } from "react"
import RestaurantDataService from "../services/RestaurantService"

const Randomizer = (props) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        retrieveRestaurants();
    }, []);

    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                setRestaurants(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveList = () => {
        retrieveRestaurants();
    }

  return (
    <div>
        <h1> </h1>
        {restaurants &&
          restaurants.map((restaurant) => (
              <p> 
              {restaurant.name}          
              </p>
          ))}

      <button className="btn btn-md btn-primary" onClick={retrieveList}>
        Randomize
      </button>
    </div>
  );
};

export default Randomizer;
