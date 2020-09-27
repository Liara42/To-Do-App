//Model
class ToDo{
  constructor(items=[]){
    this.listItems = items;
    this.check = [];
  }

  //Add new list item
  addNewItem(item){
    this.listItems.push(item);
    return this.listItems;
  }

  //Delete list item
  deleteItem(randList, count){
    randList.splice(count, 1);
    return randList;
  }

  //Check list item
  checkItem(index){
    this.check[index] = this.check[index]? 0 : 1;
    return this.check; 
  }
}

//UI handling
let taskList = ["Pay Bills", "Hit the Gym", "Read the Book"];

let list = new ToDo(taskList);
renderList(taskList);

//Persist Data
persistItems();

console.log(list.listItems,list.check);
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
  checkedElement();
}

//Adding new element

function addNewElement() {
  let inputElement = document.getElementById('inputContent').value;

  if (inputElement === '') {
    alert('You must enter something');
  } else {
    list.addNewItem(inputElement);
    renderList(list.listItems);
    //Persist Data
    persistItems();
    }
  }

//Delete element

function deleteElement() {
  let deleteBtn = document.getElementsByClassName('delete');

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", function(event){
      event.stopPropagation();
      list.deleteItem(list.listItems, i);
      list.deleteItem(list.check, i);
      renderList(list.listItems);
      renderChecked();
      //Persist Data
      persistItems();
      persistChecks();
    });
  }
}

//Add checked to list item

function checkedElement() {
  let checkElement = document.getElementsByTagName("li");

  for (let i = 0; i < checkElement.length; i++) {
    checkElement[i].onclick = function () {
      list.checkItem(i);
      renderChecked();
      //Persist Data
      persistChecks();
    };
  }
}

//Render checked list

function renderChecked() {
  let checkEl = document.getElementsByTagName("li");
  for (let j = 0; j < checkEl.length; j++) {
    if(list.check[j]===1){
      checkEl[j].classList.remove("checked");
      checkEl[j].classList.add("checked");
    } else{
      list.check[j]=0;
      checkEl[j].classList.remove("checked");
    }
  }
}

//Persist Data

function persistItems(){
  localStorage.setItem("items", JSON.stringify(list.listItems));
}

function persistChecks(){
  localStorage.setItem("checks", JSON.stringify(list.check));
}

//Get Persisted Data on Page Load
window.addEventListener('load', (event) => {
  //Get Data
  list.listItems = JSON.parse(localStorage.getItem('items'));
  list.check = JSON.parse(localStorage.getItem('checks'));

  //Render Page
  renderList(list.listItems);
  renderChecked();
});
