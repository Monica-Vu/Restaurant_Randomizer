import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import AddRestaurant from "./components/AddRestaurant";
import Restaurant from "./components/Restaurant";
import RestaurantList from "./components/RestaurantList";

class App extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark"> 
                <a href="/restaurants" className="mx-2 navbar-brand">
                    Random Restaurant Picker
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/restaurants"} className="nav-link">
                            Restaurants
                        </Link>
                        </li> 
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link"> 
                            Add a Restaurant
                            </Link>
                    </li>
                </div>
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path ="/" element={<RestaurantList/>} />
                        <Route path="/restaurants" element={<RestaurantList/>} />
                        <Route path="/add" element={<AddRestaurant/>} />
                        <Route path="/restaurants/:id" element={<Restaurant/>} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;