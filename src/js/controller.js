// We are importing all exports from model.js which in turn will give us access to model.state and model.loadRecipe
import * as model from './model.js';

import recipeView from './views/recipeView.js';

// Polyfilling ensures that old browsers will still be supported by our application
// This is for polyfilling everything else
import 'core-js/stable';

// This is for polyfilling 'async await'
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function() {
  try {
    // use window.location.hash to find the hash in the url bar, and save it to a variable
    const id = window.location.hash.slice(1);

    // We need a guard clause here because if the hash doesn't exist in the URL, an error will occur. We can simply return nothing if it does not exist.
    if(!id) return;

    // Call the renderSpinner method before the recipe is loaded, passing in the 'parentEl' as recipeContainer.
    recipeView.renderSpinner();

    // 1. Loading the recipe
    // We are now referencing model.loadRecipe because we have exported this function from model.js and imported it into the controller. We have to pass in an id to this function, which we have defined in the controller.
    // loadRecipe is an asyncrohnous function so will therefore return a promise when called, there we need to await the promise before we can move on
    await model.loadRecipe(id);

  // 2. Rendering the recipe

  // We can create a render method that accepts the data (model.state.recipe), and then store it into the object we created in recipeView

  recipeView.render(model.state.recipe);


  } catch(err) {
    console.log(err);
  }
};

// Only run the controlRecipes function when the hash changes, this event listener listens for a change in the hash
// We also want to be able to paste a link with an existing hash into the url bar, so we need another listener based on the loading of the page
// We can listen for multiple events by looping over an array of them, then passing in the handler function (controlRecipes) into the event listener

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
}
init();
