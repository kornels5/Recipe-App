import { initializedEditPage } from './view';
import { removeRecipe, updateRecipe } from './recipes';

const removeElement = document.querySelector('#remove-recipe');
const titleElement = document.querySelector('#recipe-title');
const instructionsElement = document.querySelector('#recipe-instructions');

const recipeId = location.hash.substring(1);

initializedEditPage(recipeId);

titleElement.addEventListener('input', function(e){
    updateRecipe(recipeId, {
        title: e.target.value
    });
});
instructionsElement.addEventListener('input', function(e){
    updateRecipe(recipeId, {
        instructions: e.target.value
    });
});

removeElement.addEventListener('click', function() {
    removeRecipe(recipeId);
    location.assign('/index.html');
});

window.addEventListener('storage', function(e) {
    if (e.key === 'recipes') {
        initializedEditPage(recipeId);
    }
});

document.querySelector('#add-ingredient').addEventListener('input', function(e){
    console.log(e.target.value);
});