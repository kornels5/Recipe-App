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

    if (typeof updates.body === 'string') {
        recipe.instructions = updates.body;
    }

    saveRecipes();
    return recipe;
}

recipes = loadRecipes();

export {getRecipes, createRecipe, removeRecipe, updateRecipe, saveRecipes};