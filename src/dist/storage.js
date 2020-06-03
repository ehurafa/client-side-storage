"use strict";

var dbSelected = document.getElementById('dbSelected'); // const storages = ["localStorage", "sessionStorage"];

var storages = {
  "types": ["localStorage", "sessionStorage"],
  "isStorage": function isStorage(type) {
    if (type == "localStorage") return true;
  }
};

var storageSetup = function storageSetup() {
  if (!localStorage.db) localStorage.setItem('db', "localStorage");
  return localStorage.getItem('db');
};

var cleanDb = function cleanDb() {
  console.log('cleanDb');

  if (localStorage.getItem("contacts")) {
    localStorage.removeItem("contacts");
  }

  if (sessionStorage.getItem("contacts")) {
    sessionStorage.removeItem("contacts");
  }
};

var selectedDb = function selectedDb(type) {
  console.log('selectedDb');
  cleanDb();
  localStorage.setItem('db', type.options[type.selectedIndex].value);
  dbSelected.innerHTML = "Voc\xEA est\xE1 usando: ".concat(storageSetup());
  getAll(localStorage.getItem('db'));
  console.log('tipo selecionado ', localStorage.getItem('db'));
};

var iniDb = function iniDb(type) {
  console.log('func  iniDb ', type);

  if (type == "localStorage") {
    if (!localStorage.getItem("contacts")) {
      localStorage.setItem("contacts", JSON.stringify([]));
    }
  }

  if (type == "sessionStorage") {
    if (!sessionStorage.getItem("contacts")) {
      sessionStorage.setItem("contacts", JSON.stringify([]));
    }
  }
};