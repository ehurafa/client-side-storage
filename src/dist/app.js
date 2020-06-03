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

  if (type == "webSQL") {
    db.transaction(function (tx) {
      tx.executeSql("INSET INTO contats (name, email, phone) values (?,?,?);", [contact.name, contact.email, contact.phone], function () {
        var item = [];
        item.push(contact);
        renderLine(item);
        console.log("Contato gravado com sucesso! => ", contact);
      }, function () {
        console.log("Erro ao gravar o contato");
      });
    });
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

  if (type == "webSQL") {
    var _contacts3 = [];
    db.transaction(function (tx) {
      tx.executeSql("SELECT * FROM contacts", [], function (tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
          _contacts3.push(results.rows.item(i));
        }

        console.log("web Sql | Contatos => ", _contacts3);
        renderAll(_contacts3);
      }, function () {
        console.log("Erro ao buscar contatos");
      });
    });
  }
};

getAll(storageSetup());

var renderLine = function renderLine(contact) {
  factoryContact(table, contact);
};

var search = function search(type, term) {
  iniDb(type);
  console.log('type ', type);
  var contactsFound = [];
  var contacts = JSON.parse(localStorage.getItem("contacts"));

  if (type == "localStorage") {
    contacts.forEach(function (contact) {
      if (contact.name == term || contact.email == term) {
        contactsFound.push(contact);
      }
    });
    renderAll(contactsFound);
  }

  if (type == "sessionStorage") {
    contacts.forEach(function (contact) {
      if (contact.name == term || contact.email == term) {
        contactsFound.push(contact);
      }
    });
    renderAll(contactsFound);
  }

  if (type == "webSQL") {
    db.transaction(function (tx) {
      tx.executeSql("SELECT * FROM contacts WHERE name = ? OR email =  ?", [term, term], function (tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
          contactsFound.push(results.rows.item(i));
        }

        console.log("web Sql | Contatos encontrados => ", contactsFound);
        renderAll(contactsFound);
      }, function () {
        console.log("Erro ao buscar contatos");
      });
    });
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