//  localStorage.setItem('items', JSON.stringify(items));
//  const storage = JSON.parse(localStorage.getItem('items'));

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
    div.parentNode.removeChild(div); 
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
  }
);

//Add New List Item
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
