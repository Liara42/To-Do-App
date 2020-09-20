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