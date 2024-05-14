//==========form variables===============================================

const formItems = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const addButton = document.querySelector('.btn');
const clearBtn = document.getElementById('clear');
const formBtn = formItems.querySelector('button');
let isEditMode = false;

const itemsFilter = document.getElementById('filter');

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function onaddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  //============================FORM VAlidation ++++++++++++++++++++++++++++++++++++++++
  if (newItem === '') {
    alert('you have to fill the form');
    return;
  }

  //============================check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  }
  //============================calling the functions to add items to storage and DOM
  addItemToDOM(newItem);
  addItemToStorage(newItem);

  checkUI();

  /////clearing the form
  itemInput.value = '';
}

//==================this is function for adding items to the Dom=========================
function addItemToDOM(item) {
  //=============creating the list item =====================================

  const li = document.createElement('li');
  const newText = document.createTextNode(item);

  li.appendChild(newText);

  const generatedBtn = createButton('remove-item btn-link text-red');
  li.appendChild(generatedBtn);

  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  itemsFromStorage.push(item);

  //convert to JSON string

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
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
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

//============================fuction for editing the items ==============

function setItemToEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((i) => {
    i.style.color = '';
  });
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';

  itemInput.value = item.textContent;
}

//===============================Function for removing or deleting items====================================================================

function removeItem(item) {
  if (confirm('are you sure you want to delete permanently ?')) {
    // remove items from DOM
    item.remove();

    // remove items from storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  //============================filter out items to be removed========================
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  /////////////// we need to set it again to local storage ==================================
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  ///=========clearing from local storage============
  localStorage.removeItem('items');
  checkUI();
}

///========================================fuction to check the UI before showing the filter and clearAll buttons=========================

function checkUI() {
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemsFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemsFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

//===========================fnction for filteritems============================================

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    //==============comparing the 'text' and 'itemName'==================================================
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

//=========================== event Listeners ==================================================

itemList.addEventListener('click', onClickItem);
formItems.addEventListener('submit', onaddItemSubmit);
clearBtn.addEventListener('click', clearItems);
itemsFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
