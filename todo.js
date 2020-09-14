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
