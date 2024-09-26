import { useEffect } from 'react';
import { useRecipes, useRecipesDispatch, RECIPE_ACTIONS } from '../RecipesProvider';
import { fetchRecipesByIngredient } from '../recipeService';
import './RecipeList.css';

export const RecipeList = () => {
    const recipes = useRecipes();
    const dispatch = useRecipesDispatch();

    useEffect(() => {
        fetchRecipesByIngredient('chicken_breast').then((recipes) =>
            dispatch({ type: RECIPE_ACTIONS.update, payload: recipes })
        );
    }, [dispatch]);

    const handleRecipeClick = (idMeal) => {
        console.log('Recipe clicked:', idMeal);
    };

    return (
        <>
            {recipes.length > 0 ? (
                <ul className='recipe-list'>
                    {recipes.map((recipe) => (
                        <li key={recipe.idMeal} onClick={() => handleRecipeClick(recipe.idMeal)}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <h3>{recipe.strMeal}</h3>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='no-recipes'>No recipes found</p>
            )}
        </>
    );
};

