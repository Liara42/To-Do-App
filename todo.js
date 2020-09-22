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

//Persist Data in Local Storage
let persistData = function(){
  localStorage.setItem('listitem', JSON.stringify(this.item));
}

let addItem = function(listItem) {
  const item = listItem;
  this.items.push(item);

  //Persist data in localStorage
  this.persistData();

  return item;
}

let deleteItem = function(item){
  
  this.items.splice(item);

  //Persist data in localStorage
  this.persistData();
}

//Read Data from Storage
let readStorage = function() {
  const storage = JSON.parse(localStorage.getItem('likes'));

  //Restoring likes from localStorage
  if (storage) this.likes = storage;
}

export const deleteLike = (id) => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`)
    .parentElement;
  if (el) el.parentElement.removeChild(el);
};

//Restore liked recipes and shopping list on page load
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


  //Handling recipe button clicks
elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    //Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    //Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    //add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    //like controller
    controlLike();
  }
});
})