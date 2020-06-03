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
} 

const insertCell = function(newRow, cells, contact) {
    let rows = [];

    cells.forEach(function(formElemntName, i, arr) {
       
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

const getAll = (type) => { 
    iniDb(type);   

    if (type == "localStorage") {
        const contacts = JSON.parse(localStorage.getItem("contacts"));

       renderAll(contacts);
    }
}

getAll(storageSetup());

const renderLine = (contact) => {  
    factoryContact(table, contact);
} 

const search = (type, term) => {  
    iniDb(type);

    console.log('type ', type);

    if (type == "localStorage") { 
        const contacts = JSON.parse(localStorage.getItem("contacts"));

        const contactsFound = [];

        contacts.forEach((contact) => { 
   
            if (contact.name == term || contact.email == term) {
                contactsFound.push(contact);
            }
      
        });
        renderAll(contactsFound);
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


