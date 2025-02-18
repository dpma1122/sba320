import React, { useState, useEffect } from 'react';

 
export default function MexicanFoodBlog() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', instructions: '' });
    const [editingRecipe, setEditingRecipe] = useState(null);
 
    useEffect(() => {
        fetchData();
    }, []);
 
    const fetchData = async () => {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican");
            const data = await response.json();
            const mealIds = data.meals.slice(0, 5).map(meal => meal.idMeal);
 
            const detailedRecipes = await Promise.all(
                mealIds.map(async (id) => {
                    const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const detailData = await detailResponse.json();
                    return detailData.meals[0];
                })
            );
 
            const processedRecipes = detailedRecipes.map(recipe => ({
                idMeal: recipe.idMeal,
                strMeal: recipe.strMeal,
                strMealThumb: recipe.strMealThumb,
                ingredients: getIngredients(recipe),
                instructions: recipe.strInstructions
            }));
 
            setRecipes(processedRecipes);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data. Please try again later.");
            setLoading(false);
        }
    };
 
    const getIngredients = (recipe) => {
        return Array.from({ length: 20 }, (_, i) => i + 1)
            .map(i => recipe[`strIngredient${i}`] && `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`)
            .filter(Boolean)
            .join(', ');
    };
 
    const handleInputChange = (e) => {
        setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    };
 
    const addRecipe = () => {
        setRecipes([...recipes, { ...newRecipe, idMeal: Date.now().toString(), strMealThumb: 'https://via.placeholder.com/150' }]);
        setNewRecipe({ name: '', ingredients: '', instructions: '' });
    };
 
    const startEditing = (recipe) => setEditingRecipe({ ...recipe });
 
    const saveEdit = () => {
        setRecipes(recipes.map(recipe => recipe.idMeal === editingRecipe.idMeal ? editingRecipe : recipe));
        setEditingRecipe(null);
    };
 
    const deleteRecipe = (id) => setRecipes(recipes.filter(recipe => recipe.idMeal !== id));
 
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
 
    return (
        <div className="mexican-food-blog">
            <h1>Mexican Food Blog</h1>
 
            <div className="add-recipe">
                <h2>Add New Recipe</h2>
                <input type="text" name="name" value={newRecipe.name} onChange={handleInputChange} placeholder="Recipe Name" />
                <input type="text" name="ingredients" value={newRecipe.ingredients} onChange={handleInputChange} placeholder="Ingredients" />
                <input type="text" name="instructions" value={newRecipe.instructions} onChange={handleInputChange} placeholder="Instructions" />
                <button onClick={addRecipe}>Add Recipe</button>
            </div>
 
            <h2>Mexican Recipes</h2>
            <div className="recipes-list">
                {recipes.map((recipe) => (
                    <div key={recipe.idMeal} className="recipe-card">
                        {editingRecipe && editingRecipe.idMeal === recipe.idMeal ? (
                            <div className="edit-form">
                                <input type="text" value={editingRecipe.strMeal} onChange={(e) => setEditingRecipe({ ...editingRecipe, strMeal: e.target.value })} />
                                <textarea value={editingRecipe.ingredients} onChange={(e) => setEditingRecipe({ ...editingRecipe, ingredients: e.target.value })} />
                                <textarea value={editingRecipe.instructions} onChange={(e) => setEditingRecipe({ ...editingRecipe, instructions: e.target.value })} />
                                <button onClick={saveEdit}>Save</button>
                                <button onClick={() => setEditingRecipe(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div className="recipe-details">
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                <h3>{recipe.strMeal}</h3>
                                <h4>Ingredients:</h4>
                                <p>{recipe.ingredients}</p>
                                <h4>Instructions:</h4>
                                <p>{recipe.instructions}</p>
                                <button onClick={() => startEditing(recipe)}>Edit</button>
                                <button onClick={() => deleteRecipe(recipe.idMeal)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
