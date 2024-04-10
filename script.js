//==========form variables===============================================

const formItems = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const addButton = document.querySelector('.btn');

//========function for the event listeners=============================

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  //============================FORM VAlidation ++++++++++++++++++++++++++++++++++++++++
  if (newItem === '') {
    alert('you have to fill the form');
    return;
  }

  //================================creating the list item =====================================
  const li = document.createElement('li');
  const newText = document.createTextNode(newItem);

  li.appendChild(newText);

  const generatedBtn = createButton('remove-item btn-link text-red');
  li.appendChild(generatedBtn);
  itemList.appendChild(li);
  /////////////clearing the form
  itemInput.value = '';
}

///======================== function for creatin gthe buttons==========================================

function createButton(classes) {
  const newBtn = document.createElement('button');
  newBtn.className = classes;
  const generatedIcon = createIcon('fa-solid fa-xmark');
  newBtn.appendChild(generatedIcon);
  return newBtn;
}

// ===============================function for creating the icons THEN I APPEND IT TO THE BRTTON============================================
function createIcon(iclasses) {
  const newIcon = document.createElement('i');
  newIcon.className = iclasses;
  return newIcon;
}

//=========================== event Listeners ==================================================
formItems.addEventListener('submit', addItem);
