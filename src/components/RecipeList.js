import React, { useState, useEffect } from "react";
import RecipeDataService from "../services/RecipeService";
import { Link } from "react-router-dom";

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveRecipes();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const retrieveRecipes = () => {
        RecipeDataService.getAll()
            .then(response => {
                setRecipes(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveRecipes();
        setCurrentRecipe(null);
        setCurrentIndex(-1);
    };

    const setActiveRecipe = (recipe, index) => {
        setCurrentRecipe(recipe);
        setCurrentIndex(index);
    };

    const removeAllRecipes = () => {
        RecipeDataService.removeAll()
        .then(response => {
            console.log(response.data);
            refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    };

    const findByName = () => {
        RecipeDataService.findByName(searchName)
            .then(response => {
                setRecipes(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    return (
       <div className="list row">
           <div className="col-md-8">
               <div className="input-group m-3">
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
                <h4> Recipes List </h4>

                <ul className="list-group">
                    {recipes && recipes.map((recipe, index) => (
                        <li 
                            className={
                                "list-group-item" + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveRecipe(recipe, index)}
                            key={index}
                            >
                                {recipe.name}
                            </li>
                    ))}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllRecipes}
                > 
                    Remove All
                </button>
                </div> 
                <div className="col-md-6"> 
                {currentRecipe ? (
                    <div> 
                        <h4>Tutorial</h4>
                        <div> 
                            <label> 
                            <strong> Title: </strong>
                            </label> {" "}
                            {currentRecipe.name}
                        </div>
                        <div> 
                            <label> 
                                <strong>Ingredients: </strong>
                            </label>{" "}
                            {currentRecipe.ingredients}
                        </div> 
                        <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          > Update </button> 
                        </div> 
                ) : (
                        <div>
                        <br /> 
                        <p> Please click on a Recipe...</p>
                    </div>
                )}
                </div> 
    );
};

export default RecipesList;