import { getFilters } from './filters';
import { getRecipes, removeRecipe, saveRecipes } from './recipes';

const generateRecipeDOM = (recipe) => {

    const recipeEl = document.createElement('div');
    const textEl = document.createElement('a');
    const button = document.createElement('button');

    //setup remove button
    button.textContent = 'x';
    recipeEl.appendChild(button);
    button.addEventListener('click', function(){
        removeRecipe(recipe.id);
        saveRecipes();
        renderRecipes();
    });

    //setup recipe title
    if(recipe.title.length > 0) {
        textEl.textContent = recipe.title;
    } else {
        textEl.textContent = 'unnamed recipe';
    }

    textEl.setAttribute('href', `/edit.html#${recipe.id}`);
    recipeEl.appendChild(textEl);

    return recipeEl;
}

const renderRecipes = () => {
    const recipesEl =  document.querySelector('#recipes');
    const filters = getFilters();
    const recipes = getRecipes();
    const filteredRecipes = recipes.filter(function (recipe) {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    recipesEl.innerHTML = '';

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe);
            recipesEl.appendChild(recipeEl);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No recipes to show';
        recipesEl.appendChild(emptyMessage);
    }
}

const initializedEditPage = (recipeId) => {
    const recipeTitle = document.querySelector('#recipe-title');
    const recipeInstructions = document.querySelector('#recipe-instructions');
    const recipes = getRecipes();
    const recipe = recipes.find((recipe) => recipe.id === recipeId);

    renderIngredients(recipeId);

    if (!recipe) {
       location.assign('/index.html');
    }

    recipeTitle.value = recipe.title;
    recipeInstructions.value = recipe.instructions;
}

const renderIngredients = (recipeId) => {
    const ingredientsEl = document.querySelector('#ingredients');
    const recipes = getRecipes();
    const ingredients = recipes.find(recipe => recipe.id === recipeId).ingredients;

    ingredientsEl.innerHTML = '';

    if(ingredients.length > 0) {
        ingredients.forEach((ingredient) => {
            ingredientsEl.appendChild(generateIngredientDOM(ingredient));
        });
    } else {
        const messageEl = document.createElement('p');
        messageEl.textContent = 'no ingredients';
        ingredientsEl.appendChild(messageEl);
    }
}

const generateIngredientDOM = (ingredient) => {
    const ingredientEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const ingredientName = document.createElement('span');
    const removeButton = document.createElement('button');

    ingredientName.textContent = ingredient.name;

    containerEl.appendChild(ingredientName);
    ingredientEl.appendChild(containerEl);

    return ingredientEl;
}

export {generateRecipeDOM, renderRecipes, initializedEditPage, renderIngredients};