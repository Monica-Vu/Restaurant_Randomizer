import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeDataService from "../services/RecipeService";

const Recipe = props => {
    const { id } = useParams();
    const navigate = useNavigate();

    const intialRecipeState = {
        id: null,
        name: "",
        ingredients: ""
    }

    const [currentRecipe, setCurrentRecipe] = useState(intialRecipeState);
    const [message, setMessage] = useState("");

    const getRecipe = id => {
        RecipeDataService.get(id)
            .then(response => {
            setCurrentRecipe(response.data);
            console.log(response.data)
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        if (id)
            getRecipe(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentRecipe({ ...currentRecipe, [name]: value });
    };

    const updateRecipe = () => {
        RecipeDataService.update(currentRecipe.id, currentRecipe)
        .then(response => {
            console.log(response.data);
            setMessage("This recipe was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };

    const deleteRecipe = () => {
        RecipeDataService.delete(currentRecipe.id)
        .then(response => {
            console.log(response.data);
            navigate("/recipes");
        })
        .catch(e => {
            console.log(e);
        });
    };
    return (
        <div className="col-md-6">
          {currentRecipe ? (
            <div className="edit-form">
              <h4>Recipe</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={currentRecipe.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ingredients">Ingredients</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredients"
                    name="ingredients"
                    value={currentRecipe.ingredients}
                    onChange={handleInputChange}
                  />
                </div>
                </form> 
    
              <button className="badge badge-danger mr-2" onClick={deleteRecipe}>
                Delete
              </button>
    
              <button
                type="submit"
                className="badge badge-success"
                onClick={updateRecipe}
              >
                Update
              </button>
              <p>{message}</p>
            </div>
            
          ) : (
            <div>
              <br />
              <p>Please click on a Recipe...</p>
            </div>
          )}
        </div>
      );
    };

export default Recipe;