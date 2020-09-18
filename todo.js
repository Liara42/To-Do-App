//Add delete button and add it to each list item
let nodeList = document.getElementsByTagName('li');

for (let i = 0; i < nodeList.length; i++) {
  let span = document.createElement('span');
  let text = document.createTextNode('\u00D7');

  span.className = 'delete';
  span.appendChild(text);
  nodeList[i].appendChild(span);
}

//Click on delete button and handle the event
let deleteBtn = document.getElementsByClassName('delete');

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].onclick = function () {
    let div = this.parentElement;
    div.style.display = 'none';
  };
}

//Add checked when clicking on list item
let list = document.querySelector('ul');
list.addEventListener(
  'click',
  function (event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('checked');
    }
  },
  false
);

// Starting with Persistence
function addNewElement() {
  let li = document.createElement('li');
  let inputElement = document.getElementById('inputContent').value;
  let tn = document.createTextNode(inputElement);

  li.appendChild(tn);

  if (inputElement === '') {
    alert('You must enter something');
  } else {
    document.getElementById('uList').appendChild(li);
  }
  document.getElementById('inputContent').value = '';

  let span = document.createElement('span');
  let text = document.createTextNode('\u00D7');

  span.className = 'delete';
  span.appendChild(text);
  li.appendChild(span);

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = 'none';
    };
  }
}

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    //Persist data in localStorage
    this.persistData();

    return like;
  }
  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);

    //Persist data in localStorage
    this.persistData();
  }
  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }
  getNumLikes() {
    return this.likes.length;
  }
  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    //Restoring likes from localStorage
    if (storage) this.likes = storage;
  }
}

// Another example of Persistence
//It needs to be modified
import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.items.push(item);
    this.persistDataList();
    return item;
  }
  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    this.items.splice(index, 1);
    this.persistDataList();
  }
  updateCount(id, newCount) {
    this.items.find((el) => el.id === id).count === newCount;
  }
  persistDataList() {
    localStorage.setItem('list', JSON.stringify(this.items));
  }

  readStorageList() {
    const storage = JSON.parse(localStorage.getItem('list'));

    //Restoring likes from localStorage
    if (storage) this.list = storage;
  }
}

// Adding missing parts of JS
import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
};

const formatCount = (count) => {
  if (count) {
    const newCount = Math.round(count * 10000) / 10000;
    const [int, dec] = newCount
      .toString()
      .split('.')
      .map((el) => parseInt(el, 10));

    if (!dec) return newCount;

    if (int === 0) {
      const fr = new Fraction(newCount);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(newCount - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return '?';
};

export const updateServingsIngredients = (recipe) => {
  //Update servings
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.servings;
  //Update ingredients
  const countElements = Array.from(document.querySelectorAll('.recipe__count'));
  countElements.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};
// What to do with this code
const controlList = () => {
  //Create new list if there is none yet
  if (!state.list) state.list = new List();
  //Add each ingredient to list and ui
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
  listView.createButton();
};

// Load and Restore Page
window.addEventListener('load', () => {
  state.likes = new Likes();
  state.list = new List();
  //restore likes and list
  state.likes.readStorage();
  state.list.readStorageList();
  //toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  //render existing likes and shopping list
  state.likes.likes.forEach((like) => likesView.renderLike(like));
  state.list.list.forEach((list) => listView.renderItem(list));

  // Add delete shopping list button when loading page
});

//Control Like
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  //user has not yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    //add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    //toggle like button
    likesView.toggleLikeBtn(true);
    //add like to ui list
    likesView.renderLike(newLike);
    //user has liked current recipe
  } else {
    //remove like from state
    state.likes.deleteLike(currentID);
    //toggle like button
    likesView.toggleLikeBtn(false);
    //remove like from ui list

    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

import axios from 'axios';
import { api } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(`${api}/api/search?q=${this.query}`);
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}

async getRecipe() {
  try {
    const res = await axios(`${api}/api/get?rId=${this.id}`);
    this.title = res.data.recipe.title;
    this.author = res.data.recipe.publisher;
    this.img = res.data.recipe.image_url;
    this.url = res.data.recipe.source_url;
    this.ingredients = res.data.recipe.ingredients;
  } catch (error) {
    console.log(error);
    alert('Something went wrong');
  }
}
calcTime() {
  //Assuming that we need 15 min for all 3 ingredients
  const numIng = this.ingredients.length;
  const periods = Math.ceil(numIng / 3);
  this.time = periods * 15;
}

const newIngredients = this.ingredients.map((el) => {
      //1) Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      //2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      //3) Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

      let objIng;

      if (unitIndex > -1) {
        //There is a unit

        const arrCount = arrIng.slice(0, unitIndex);

        let count;

        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
        };
      } else if (parseInt(arrIng[0], 10)) {
        //There is no unit but first element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        //There is no unit and no number in first position
        objIng = {
          count: 1,
          unit: '',
          ingredient,
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }

  //model R

  const newIngredients = this.ingredients.map((el) => {
    //1) Uniform units
    let ingredient = el.toLowerCase();
    unitsLong.forEach((unit, i) => {
      ingredient = ingredient.replace(unit, unitsShort[i]);
    });

    //2) Remove parentheses
    ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
    //3) Parse ingredients into count, unit and ingredient
    const arrIng = ingredient.split(' ');
    const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

    let objIng;

    if (unitIndex > -1) {
      //There is a unit

      const arrCount = arrIng.slice(0, unitIndex);

      let count;

      if (arrCount.length === 1) {
        count = eval(arrIng[0].replace('-', '+'));
      } else {
        count = eval(arrIng.slice(0, unitIndex).join('+'));
      }

      objIng = {
        count,
        unit: arrIng[unitIndex],
        ingredient: arrIng.slice(unitIndex + 1).join(' '),
      };
    } else if (parseInt(arrIng[0], 10)) {
      //There is no unit but first element is number
      objIng = {
        count: parseInt(arrIng[0], 10),
        unit: '',
        ingredient: arrIng.slice(1).join(' '),
      };
    } else if (unitIndex === -1) {
      //There is no unit and no number in first position
      objIng = {
        count: 1,
        unit: '',
        ingredient,
      };
    }

    return objIng;
  });
  this.ingredients = newIngredients;
}

//  Add the rest of the JS
