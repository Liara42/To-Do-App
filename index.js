/*TO DO ITEM = {name: string, check: boolean}*/
//Model
class ToDo{
  constructor(items=[]){
    this.listItems = items;
  }

  //Add new list item
  addNewItem(nameStr){
    let listItem = {
      name: nameStr,
      check: 0
    };

    this.listItems.push(listItem);
    return this.listItems;
  }

  //Delete list item
  deleteItem(count){
    this.listItems.splice(count, 1);
    return this.listItems;
  }

  //Check list item
  checkItem(index){
    this.listItems[index].check = this.listItems[index].check ? 0 : 1;
    return this.listItems; 
  }
}

//UI handling
let list = new ToDo();

//Render list
function renderList(list){
  let myNode = document.getElementById("uList");
  myNode.innerHTML = '';

  for(let i = 0; i < list.length; i++){
    let li = document.createElement('li');
    let span = document.createElement('span');
    let text = document.createTextNode('\u00D7');
   
    li.appendChild(document.createTextNode(list[i].name));
  
    document.getElementById('uList').appendChild(li);
    document.getElementById('inputContent').value = '';

    span.className = 'delete';
    span.appendChild(text);
    li.appendChild(span);

    if(list[i].check===1){
      li.classList.add("checked");
    }
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
      list.deleteItem(i);
      renderList(list.listItems);
      //Persist Data
      persistItems();
    });
  }
}

//Add checked to list item

function checkedElement() {
  let checkElement = document.getElementsByTagName("li");

  for (let i = 0; i < checkElement.length; i++) {
    checkElement[i].onclick = function () {
      list.checkItem(i);
      renderList(list.listItems);
      //Persist Data
      persistItems();
    };
  }
}

//Persist Data
function persistItems(){
  localStorage.setItem("items", JSON.stringify(list.listItems));
}

//Get Persisted Data on Page Load
window.addEventListener('load', (event) => {
  //Get Data
  if(localStorage.getItem('items')!== null){
    list.listItems = JSON.parse(localStorage.getItem('items'));
  }

  //Render Page
  renderList(list.listItems);
});
