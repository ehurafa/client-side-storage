"use strict";

var dbSelected = document.getElementById('dbSelected');
var db = openDatabase('contacts', '1.0', 'Armazena a lista de contatos', 2 * 1024 * 1024); // const storages = ["localStorage", "sessionStorage"];

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

  removeWebSQL("webSQL");
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

  if (type == "webSQL") {
    db.transaction(function (tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS " + "contacts(id integer primary key asc, name string not null, email string not null, phone string)", [], function () {
        console.log('Tabela contacts criada com sucesso!');
      });
    });
  }
};

var removeWebSQL = function removeWebSQL(type) {
  iniDb(type);

  if (type == "webSQL") {
    db.transaction(function (tx) {
      tx.executeSql("SELECT COUNT(*) FROM contacts;", [], function (tx, results) {
        console.log("web SQL | Count => ", results.rows.item(0)["COUNT(*)"]);

        if (results.rows.item(0)["COUNT(*)"] > 0) {
          db.transaction(function (tx) {});
        }
      });
    });
  }
};