

const table = document.getElementById('contacts').getElementsByTagName('tbody')[0];

const iniDb = (type) => {  console.log('func  iniDb ', type);
   if (type == "localStorage") {
        if (!localStorage.getItem("contacts"))  {
            localStorage.setItem("contacts", JSON.stringify([]));  
        }                 
   }
}

const cleanDb = () => {
    
    if (localStorage.getItem("db"))  {
        localStorage.removeItem("db");
    }
       
}

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

const getAll = (type) => {
    iniDb(type);   

    if (type == "localStorage") {
        const contacts = JSON.parse(localStorage.getItem("contacts"));

       // renderAll(contacts);
    }
}

const renderLine = (contact) => {  

    factoryContact(table, contact);

} 

const search = (type, term) => {  console.log('search ', term);
    iniDb(type);

    console.log('type ', type);

    if (type == "localStorage") {  console.log('1 ');
        const contacts = JSON.parse(localStorage.getItem("contacts"));

        const contactsFound = [];

        contacts.forEach((contact) => { console.log('2 ');
            console.log(contact);
            if (contact.name == term || contact.email == term) {
                contactsFound.push(contact);
            }
            console.log(contactsFound);
        });
        renderAll(contactsFound);
    }
}  

const factoryContact = (table, contact) => { // console.log('factoryContact ', contact);
    
    contact.forEach((item, i, array) => {    
            
        const newRow = table.insertRow(table.rows.length);

        const cellName = newRow.insertCell(0);

        const cellEmail = newRow.insertCell(1);

        const cellPhone = newRow.insertCell(2);

        const cellButton = newRow.insertCell(3);

        const name = document.createTextNode(item['name']);

        const email = document.createTextNode(item['email']);

        const phone = document.createTextNode(item['phone']);

        cellName.appendChild(name);
        cellEmail.appendChild(email);
        cellPhone.appendChild(phone);

        cellButton.innerHTML = "<button type='button' onclick='removeContact(this)'>x</button>"; 

       // console.log(newRow);

  }); 
} 


const renderAll = (contacts) => {   console.log('renderAll');

let  table = document.getElementById('contacts').getElementsByTagName('tbody')[0];

    const newTbody = document.createElement('tbody');    

    table.parentNode.replaceChild(newTbody, table);

     table = document.getElementById('contacts').getElementsByTagName('tbody')[0];

   console.log('table  ', table );

   console.log('renderAll contacts ', contacts);

   factoryContact(table, contacts);
      
}

// renderAll();

// renderLine();

/////////

 // getAll(localStorage.getItem('db'));

const cadForm = document.getElementById('cadForm');

cadForm.addEventListener('submit', function(e) {

    e.preventDefault();
    
    console.log(e);
    if (cadForm.checkValidity()) {

        const formData = new FormData(cadForm);

        const contact = {
            'name': formData.get('contact.name'),
            'email': formData.get('contact.email'),
            'phone': formData.get('contact.phone')
        }

        save("localStorage", contact);

        cadForm.reset();

        e.preventDefault();

        console.info('formulario preenchido');
    } else {
        console.error('erro');
    }
}, false);

const autoLoad = () => {
    dbSelected = document.getElementById('dbSelected');

    dbSelected.innerHTML = `Você está usando: ${storageSetup()}`;
}

const selectedDb = (type) => {  
  
    cleanDb();
    localStorage.setItem('db', type.options[type.selectedIndex].value);
    autoLoad();

}

searchEvt = document.getElementById('search');

searchEvt.addEventListener('click', (evt) => {

    

    const term = document.getElementById('filter').value;

    console.log(term);

    search(storageSetup(), term);
});

removeContact = (row) => {
    let i = row.parentNode.parentNode.rowIndex;

    console.log('linha removeida ', i);
    document.getElementById('contatos').deleteRow(i);
}



storageSetup = () => {
    if (!localStorage.db) localStorage.setItem('db', "localStorage");

    return localStorage.getItem('db');
}

