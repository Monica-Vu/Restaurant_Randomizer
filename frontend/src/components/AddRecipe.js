import React, { useState } from "react";
import RecipeDataService from "../services/RecipeService";

const AddRecipe = () => {
    const intialRecipeState = {
        id: null,
        name: "",
        ingredients: ""
    };

    const [recipe, setRecipe] = useState(intialRecipeState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value})
    };

    const saveRecipe = () => {
        let data = {
            name: recipe.name,
            ingredients: recipe.ingredients
        };

        RecipeDataService.create(data)
            .then(response => {
                setRecipe({
                    id: response.data.id,
                    name: response.data.name,
                    ingredients: response.data.ingredients
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    
    const newRecipe = () => {
        setRecipe(intialRecipeState);
        setSubmitted(false);
    };

    return (
    <div className="submit-form"> 
        {submitted ? (
            <div>
                <h4>You submitted successfully</h4>
                <button className="btn btn-success" onClick={newRecipe}> 
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
                    value={recipe.name}
                    onChange={handleInputChange}
                    name="name"
                    /> 
                </div>

                <div className="form-group">
                <label htmlFor="description">Ingredients</label>
                <input 
                    type="text"
                    className="form-control"
                    id="ingredients"
                    required 
                    value={recipe.ingredients}
                    onChange={handleInputChange}
                    name="ingredients"
                    /> 
                </div>

                <button onClick={saveRecipe} className="btn btn-success">
                Submit
                </button>
            </div>
        )}
        </div>
    );
};

export default AddRecipe;
