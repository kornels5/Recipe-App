const recipes = [{
    title: 'Pizza',
    instructions: '1 Step ... 2 Step ... 3 Step ...',
    ingredients: [{
        name: 'tomato',
        available: false
    }]
}, {
    title: 'Pasta',
    instructions: '1 Step ... 2 Step ...',
    ingredients: [{
        name: 'tomato',
        available: false
    }]
}, {
    title: 'Pasta',
    instructions: '1 Step ... 2 Step ...',
    ingredients: [{
        name: 'tomato',
        available: false
    }]
}];

const filters = {
    searchText: ''
}

const renderRecipes = function (recipes, filters) {
    const filteredRecipes = recipes.filter(function (recipe) {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    document.querySelector('#recipes').innerHTML = '';

    filteredRecipes.forEach(function (recipe) {
        const recipeEl = document.createElement('p');
        recipeEl.textContent = recipe.title;
        document.querySelector('#recipes').appendChild(recipeEl);
    });
}

renderRecipes(recipes, filters);

document.querySelector('#add-recipe').addEventListener('click', function (e) {
    console.log('ok');
});

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderRecipes(recipes, filters);
});