// The view is going to be a class
// We want each view to have a few private properties

// Parcel specific import for assets that aren't js files
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView {
  // Properties
  #parentElement = document.querySelector('.recipe');
  #data;


  // Public render method
  // Our recipe information now exists in this render method as 'data'. This is because the render method takes (data), the render method itself is called in the controller and takes in 'model.state.recipe', which is in the model. The recipe information is altered in the model to create a standalone state object.

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Private method only accessed here
  #clear() {
    this.#parentElement.innerHTML = '';
  }

  // Create a spinner for loading - parentEl is generic so we can use this across different parent elements
  renderSpinner = function() {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `
  this.#parentElement.innerHTML = '';
  this.#parentElement.insertAdjacentHTML('afterbegin', markup);
};

addHandlerRender(handler) {
  ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
}

  // Private method
  #generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this.#data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this.#data.ingredients.map(this.#generateMarkupIngrediant).join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
  }

  #generateMarkupIngrediant(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
    </li>
    `;
  }
}

// We are not exporting the class itself, we are creating an object instance of the class RecipeView then exporting this to the controller
// So how do we pass data into the RecipeView from the controller? we cannot pass data into RecipeView because we are creating the object right here...
export default new RecipeView();
