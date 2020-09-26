class ToDo{
  constructor(items=[]){
    this.listItems = items;
  }

  //Add new list item
  addNewItem(item){
    this.listItems.push(item);
    return this.listItems;
  }

  //Delete list item
  deleteItem(count){
    this.listItems.splice(count, 1);
    return this.listItems;
  }
}

//UI handling
let taskList = ["Pay Bills", "Hit the Gym", "Read the Book"];

let list = new ToDo(taskList);
renderList(taskList);

//Render list
function renderList(inputText){
  let myNode = document.getElementById("uList");
  myNode.innerHTML = '';

  for(let i = 0; i < inputText.length; i++){
    let li = document.createElement('li');
    let span = document.createElement('span');
    let text = document.createTextNode('\u00D7');
   
    li.appendChild(document.createTextNode(inputText[i]));
  
    document.getElementById('uList').appendChild(li);
    document.getElementById('inputContent').value = '';

    span.className = 'delete';
    span.appendChild(text);
    li.appendChild(span);
  }
  deleteElement();
}

//Adding new element

function addNewElement() {
  let inputElement = document.getElementById('inputContent').value;

  if (inputElement === '') {
    alert('You must enter something');
  } else {
    list.addNewItem(inputElement);
    renderList(list.listItems);
    }
  }

//Delete element

function deleteElement() {
  let deleteBtn = document.getElementsByClassName('delete');

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = function () {
      list.deleteItem(i);
      renderList(list.listItems);
    };
  }
}

//Add checked to list item
let checkList = document.querySelector('ul');
checkList.addEventListener(
  'click',
  function (event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('checked');
    }
  }
);