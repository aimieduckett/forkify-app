import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

// We are creating an empty state object, which contains an empty recipe object (initially)
// We then need to export this state object, so that we may use it in the controller

// This state object will be altered when the loadRecipe method is called, and because we are exporting it, the controller will then has access to the state object.

// We have more than one named export here listed in the model, we can import based on specific exports but in this case we want to import * all into the controller
export const state = {
  recipe: {},
};

// We create the loadRecipe method here, and also export it so that we may use it in the controller

// We don't know which id to get, as it is not a variable in the model. We can pass it into the function itself, then in turn it is the controller that will get the id.

export const loadRecipe = async function(id) {
  try {

    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      published: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cookingTime,
      ingredients: recipe.ingredients
  }
  console.log(state.recipe);
} catch(err) {
  // Temp error handling
  console.error(`${err}`);
}
};
