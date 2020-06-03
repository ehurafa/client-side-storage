"use strict";

// import Events from './events.js';
var table = document.getElementById('contacts').getElementsByTagName('tbody')[0];
var searchEvt = document.getElementById('search');
var cadForm = document.getElementById('cadForm');

var save = function save(type, contact) {
  iniDb(type);

  if (type == "localStorage") {
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    var item = [];
    item.push(contact);
    renderLine(item);
  }

  console.log('type --- ', type);

  if (type == "sessionStorage") {
    var _contacts = JSON.parse(sessionStorage.getItem("contacts"));

    console.log('contacts 1 ', _contacts);

    _contacts.push(contact);

    sessionStorage.setItem("contacts", JSON.stringify(_contacts));
    console.log('contacts 1 ', _contacts);
    var _item = [];

    _item.push(contact);

    console.log('item 1 ', _item);
    renderLine(_item);
  }
};

var insertCell = function insertCell(newRow, cells, contact) {
  var rows = [];
  cells.forEach(function (formElemntName, i, arr) {
    var textNode = document.createTextNode(contact[formElemntName]);
    rows[i] = newRow.insertCell(i);
    rows[i].appendChild(textNode);
  });
  return rows;
};

var factoryContact = function factoryContact(table, contact) {
  contact.forEach(function (item, i, array) {
    var newRow = table.insertRow(table.rows.length);
    var rows = insertCell(newRow, ['name', 'email', 'phone'], item);
    var cellButton = newRow.insertCell(3);
    cellButton.innerHTML = "<button type='button' onclick='removeContact(this)'>x</button>";
  });
};

var renderAll = function renderAll(contacts) {
  var newTbody = document.createElement('tbody');
  table.parentNode.replaceChild(newTbody, table);
  table = document.getElementById('contacts').getElementsByTagName('tbody')[0];
  factoryContact(table, contacts);
};

var getAll = function getAll(type) {
  console.log('getAll');
  iniDb(type);

  if (type == "localStorage") {
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    renderAll(contacts);
  }

  if (type == "sessionStorage") {
    var _contacts2 = JSON.parse(sessionStorage.getItem("contacts"));

    renderAll(_contacts2);
  }
};

getAll(storageSetup());

var renderLine = function renderLine(contact) {
  factoryContact(table, contact);
};

var search = function search(type, term) {
  iniDb(type);
  console.log('type ', type);

  if (type == "localStorage") {
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    var contactsFound = [];
    contacts.forEach(function (contact) {
      if (contact.name == term || contact.email == term) {
        contactsFound.push(contact);
      }
    });
    renderAll(contactsFound);
  }

  if (type == "sessionStorage") {
    var _contacts3 = JSON.parse(sessionStorage.getItem("contacts"));

    var _contactsFound = [];

    _contacts3.forEach(function (contact) {
      if (contact.name == term || contact.email == term) {
        _contactsFound.push(contact);
      }
    });

    renderAll(_contactsFound);
  }
};

searchEvt.addEventListener('click', function (evt) {
  var term = document.getElementById('filter').value;
  search(storageSetup(), term);
});

var removeContact = function removeContact(row) {
  var i = row.parentNode.parentNode.rowIndex;
  console.log('linha removeida ', i);
  document.getElementById('contatos').deleteRow(i);
};