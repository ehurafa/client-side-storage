let dbSelected = document.getElementById('dbSelected');

const db = openDatabase('contacts', '1.0', 'Armazena a lista de contatos', 2 * 1024 * 1024);

// const storages = ["localStorage", "sessionStorage"];
const storages = {
    "types": ["localStorage", "sessionStorage"],
    "isStorage": function(type) {
        if (type == "localStorage") return true
    }
}

const storageSetup = () => {
    if (!localStorage.db) localStorage.setItem('db', "localStorage");

    return localStorage.getItem('db');
}

const cleanDb = () => {  console.log('cleanDb');
    
    if (localStorage.getItem("contacts"))  {
        localStorage.removeItem("contacts");
    }

    if (sessionStorage.getItem("contacts"))  {
        sessionStorage.removeItem("contacts");
    }

    removeWebSQL("webSQL");
       
}

const selectedDb = (type) => {   console.log('selectedDb');
  
    cleanDb();
    localStorage.setItem('db', type.options[type.selectedIndex].value);
   
    dbSelected.innerHTML = `Você está usando: ${storageSetup()}`;
    getAll(localStorage.getItem('db'));
    console.log('tipo selecionado ', localStorage.getItem('db'));
}

const iniDb = (type) => {  console.log('func  iniDb ', type);
   if (type == "localStorage") {
        if (!localStorage.getItem("contacts"))  {
            localStorage.setItem("contacts", JSON.stringify([]));  
        }                 
   }

   if (type == "sessionStorage") {
        if (!sessionStorage.getItem("contacts"))  {
            sessionStorage.setItem("contacts", JSON.stringify([]));  
        }                 
    }

    if (type == "webSQL") {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS " +
            "contacts(id integer primary key asc, name string not null, email string not null, phone string)",
            [],
            function() {
                console.log('Tabela contacts criada com sucesso!');
            }
            )
        }) 
    }


}

const removeWebSQL = (type) => {
    iniDb(type);

    if (type == "webSQL") {
        
        db.transaction( (tx) => {
            tx.executeSql(
                "SELECT COUNT(*) FROM contacts;",
                [],
                (tx, results) => {
                    console.log("web SQL | Count => ", results.rows.item(0)["COUNT(*)"]);

                    if(results.rows.item(0)["COUNT(*)"] > 0) {
                        db.transaction((tx) => {
                            tx.executeSql(
                                "DELETE FROM contacts ", [],
                                () => { console.log("Contatos removido com sucesso!");}
                                () => { console.log("Erro ao remover contatos");}
                            )
                        })
                    }
                },
                function( ){
                    console.log("Erro ao conectar!");
                }
            )
        })


    }

}


