import uuidv4 from 'uuid/v4';

let recipes = [];

const loadRecipes = function() {
    const recipesJSON = localStorage.getItem('recipes');

    try {
        return recipesJSON ? JSON.parse(recipesJSON): []
    } catch (e) {
        return [];
    }
}

//saves recipes to localstorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

//expose recipes from module
const getRecipes = () => recipes;

const createRecipe = () => {
    const id = uuidv4();
    recipes.push({
        id: id,
        title: '',
        instructions: '',
        ingredients: []
    });
    saveRecipes();

    return id;
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id;
    });

    if(recipeIndex > -1) {
        recipes.splice(recipeIndex, 1);
        saveRecipes();
    }
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id);

    if(!recipe) {
        return 
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title;
    }

    if (typeof updates.instructions === 'string') {
        recipe.instructions = updates.instructions;
    }

    saveRecipes();
    return recipe;
}

const createIngredient = (id, name) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    
    recipe.ingredients.push({
        available: false,
        name: name
    });  
    saveRecipes();
}

const toggleIngredient = (id, name) => {
    const ingredients = recipes.find(recipe => recipe.id === id).ingredients;
    const ingredient = ingredients.find(ingredient => ingredient.name === name);

    if (ingredient) {
        ingredient.available = !ingredient.available;
        saveRecipes();
    }
}

const removeIngredient = (id, name) => {
    const ingredients = recipes.find(recipe => recipe.id === id).ingredients;
    const ingredientIndex = ingredients.findIndex(ingredient => ingredient.name === name);
    console.log(ingredientIndex);
    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1);
        saveRecipes();
    }
}

recipes = loadRecipes();

export {getRecipes, createRecipe, removeRecipe, updateRecipe, saveRecipes, createIngredient, toggleIngredient, removeIngredient };