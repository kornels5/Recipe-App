import { renderRecipes } from './view';
import { createRecipe } from './recipes';
import { setFilters } from './filters';

renderRecipes();

//adding data to local storage
document.querySelector('#add-recipe').addEventListener('click', function (e) {
    const id = createRecipe();
    location.assign(`/edit.html#${id}`);
});

//setting search input
document.querySelector('#search-text').addEventListener('input', function (e) {
    setFilters({
        searchText: e.target.value
    });
    renderRecipes();
});

window.addEventListener('storage', function(e){
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue);
        renderRecipes();
    }
});