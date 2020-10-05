/*TO DO ITEM = {name: string, check: boolean}*/
//Model
class ToDo {
  constructor(items = []) {
    this.listItems = items;
  }

  //Add new list item
  addNewItem(nameStr, index) {
    //List item object containing name and check status of item
    let listItem = {
      id: index,
      name: nameStr,
      check: 0,
    };
    //Add new item to the list
    this.listItems.push(listItem);
    return this.listItems;
  }

  //Delete list item
  deleteItem(count) {
    //Delete item with certain index from the list
    this.listItems.splice(count, 1);
    return this.listItems;
  }

  //Check list item
  checkItem(index) {
    //Toggle boolean check index
    this.listItems[index].check = this.listItems[index].check ? 0 : 1;
    return this.listItems;
  }
}

//UI handling
//Create new List
let list = new ToDo();

//Render list
function renderList(list) {
  //In the beginning, list is empty
  let myNode = document.getElementById('uList');
  myNode.innerHTML = '';

  //Create element for every list item
  for (let i = 0; i < list.length; i++) {
    //For every item, elements li and span are created, and 'x' (\uOOD7) sign for delete is added
    let li = document.createElement('li');
    let span = document.createElement('span');
    let text = document.createTextNode('\u00D7');

    //Text Node with list name is appended to li element
    li.appendChild(document.createTextNode(list[i].name));

    //'Reset' the input
    document.getElementById('uList').appendChild(li);
    document.getElementById('inputContent').value = '';

    //Add class name 'delete' to span, and 'x' sign, then add everything to li element
    span.className = 'delete';
    span.appendChild(text);
    li.appendChild(span);

    //Check if list item has boolean index for checked
    if (list[i].check === 1) {
      li.classList.add('checked');
    }
  }
  //Add event listeners for deletion and checking of items
  deleteElement();
  checkedElement();
}

//Adding new element
function addNewElement() {
  //Get input value
  let inputElement = document.getElementById('inputContent').value;

  //Check if input value is empty string
  if (inputElement === '') {
    alert('You must enter something');
    //If not, add new item to the list, and render the list
  } else {
    let index = list.listItems.length;
    let id = list.listItems[index - 1].id;

    list.addNewItem(inputElement, id + 1);
    renderList(list.listItems);
    //Persist Data
    persistItems(index);
  }
}

//Event Listener for Adding New Element
function addingListener() {
  //Select the button and add click event listener to it, which adds new item to the list
  let addBtn = document.getElementById('add-btn');
  addBtn.addEventListener('click', addNewElement);

  //Select input field and add keypress event listener to it, which adds new item to the list if 'Enter' is pressed
  let input = document.getElementById('inputContent');
  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewElement();
    }
  });
}

//Delete element
function deleteElement() {
  //Select element with 'delete' class
  let deleteBtn = document.getElementsByClassName('delete');
  //Go through all elements with 'delete' class, and add click event listener to them, which deletes item from the list, then call function to render the list
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', function (event) {
      event.stopPropagation();
      list.deleteItem(i);
      renderList(list.listItems);
      //Persist Data
      persistDeletion(i);
    });
  }
}

//Add checked to list item
function checkedElement() {
  //Select li element
  let checkElement = document.getElementsByTagName('li');
  //Go through all li elements, toggle their 'check' index on click event, and render the list
  for (let i = 0; i < checkElement.length; i++) {
    checkElement[i].onclick = function () {
      list.checkItem(i);
      renderList(list.listItems);
      //Persist Data
      persistItems();
    };
  }
}

//Persist Adding
function persistItems(index) {
  fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list.listItems[index]),
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//Persist Deletion
function persistDeletion(index) {
  fetch('http://localhost:3000/todos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list.listItems[index]),
  })
    .then((response) => {
      response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//Get JSON data
function getItems() {
  fetch('http://localhost:3000/todos')
    //Check if there is Stored Data on Server
    .then((response) => response.json())
    .then((result) => {
      list.listItems = result;
      console.log(list.listItems);

      renderList(list.listItems);
      addingListener();
    })
    .catch((error) => {
      console.error(error);
    });
}

//Add REST API and AXIOS
window.addEventListener('load', (event) => {
  getItems();

  let loader = document.getElementById('loader');
  loader.style.display = 'none';
});
