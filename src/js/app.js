// import Events from './events.js';

let table = document.getElementById('contacts').getElementsByTagName('tbody')[0];

const searchEvt = document.getElementById('search');

const cadForm = document.getElementById('cadForm');

const save = (type, contact) => { 

    iniDb(type);

    if (type == "localStorage") {
        let contacts = JSON.parse(localStorage.getItem("contacts"));

        contacts.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contacts));

        let item = [];

        item.push(contact);
        renderLine(item);
    }  

    console.log('type --- ', type);

    if (type == "sessionStorage") {
        let contacts = JSON.parse(sessionStorage.getItem("contacts"));

        console.log('contacts 1 ', contacts);

        contacts.push(contact);
        sessionStorage.setItem("contacts", JSON.stringify(contacts));

        console.log('contacts 1 ', contacts);

        let item = [];

        item.push(contact);

        console.log('item 1 ', item);
        renderLine(item);
    }  

    if (type == "webSQL") {

        db.transaction((tx) => {
            tx.executeSql(
                "INSET INTO contats (name, email, phone) values (?,?,?);",
                [contact.name, contact.email, contact.phone],            
            () => {
                let item = [];

                item.push(contact);
                renderLine(item);
                console.log("Contato gravado com sucesso! => ", contact);
            },
            () => { console.log("Erro ao gravar o contato"); }

            )
        });

    }

    
} 

const insertCell = (newRow, cells, contact) => {
    let rows = [];

    cells.forEach((formElemntName, i, arr) => {
       
        let textNode =  document.createTextNode(contact[formElemntName]);

        rows[i] = newRow.insertCell(i);
        rows[i].appendChild(textNode);
       
    });
    return rows;   
}

const factoryContact = (table, contact) => { 
    
    contact.forEach((item, i, array) => {    
            
        const newRow = table.insertRow(table.rows.length);       

        const rows = insertCell(newRow, ['name', 'email', 'phone'], item);

        const cellButton = newRow.insertCell(3);
        
        cellButton.innerHTML = "<button type='button' onclick='removeContact(this)'>x</button>"; 

  }); 
} 

const renderAll = (contacts) => { 

    const newTbody = document.createElement('tbody');    

    table.parentNode.replaceChild(newTbody, table);
    table = document.getElementById('contacts').getElementsByTagName('tbody')[0];
    factoryContact(table, contacts);
      
}

const getAll = (type) => {  console.log('getAll');
    iniDb(type);   

    if (type == "localStorage") {
        const contacts = JSON.parse(localStorage.getItem("contacts"));

        renderAll(contacts);
    }

    if (type == "sessionStorage") {
        const contacts = JSON.parse(sessionStorage.getItem("contacts"));

        renderAll(contacts);
    }

    if (type == "webSQL") {
        let contacts = [];

        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT * FROM contacts",
                [],
                (tx, results) => {
                    for (let i = 0; i < results.rows.length; i ++) {
                        contacts.push(results.rows.item(i));
                    }

                    console.log("web Sql | Contatos => ", contacts);
                    renderAll(contacts);
                },
                () => {
                    console.log("Erro ao buscar contatos");
                }
            )
        })
    }
}

getAll(storageSetup());

const renderLine = (contact) => {  
    factoryContact(table, contact);
} 

const search = (type, term) => {  
    iniDb(type);

    console.log('type ', type);

    const contactsFound = [];
    const contacts = JSON.parse(localStorage.getItem("contacts"));

    if (type == "localStorage") {        

        contacts.forEach((contact) => { 
   
            if (contact.name == term || contact.email == term) {
                contactsFound.push(contact);
            }
      
       });
        renderAll(contactsFound);
    }

    if (type == "sessionStorage") { 
       
        contacts.forEach((contact) => { 
   
            if (contact.name == term || contact.email == term) {
                contactsFound.push(contact);
            }
      
       });
        renderAll(contactsFound);
    }

    if (type == "webSQL") {              

        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT * FROM contacts WHERE name = ? OR email =  ?",
                [term, term],
                (tx, results) => {
                    for (let i = 0; i < results.rows.length; i ++) {
                        contactsFound.push(results.rows.item(i));
                    }

                    console.log("web Sql | Contatos encontrados => ", contactsFound);
                    renderAll(contactsFound);
                },
                () => {
                    console.log("Erro ao buscar contatos");
                }
            )
        })
    }
}  

searchEvt.addEventListener('click', (evt) => {    

    const term = document.getElementById('filter').value;

    search(storageSetup(), term);
}); 

const removeContact = (row) => {
    let i = row.parentNode.parentNode.rowIndex;

    console.log('linha removeida ', i);
    document.getElementById('contatos').deleteRow(i);
}


