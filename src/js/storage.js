// const iniDb = (type) => {
//     console.log(type);
// }

// const cleanDb = () => {

// }

// const save = (type, contact) => {
//     iniDb(type);
// }

// const getAll = (type) => {
//     initDb(type);
// }

// const search = (type, term) => {
//     iniDb(type);
// }



const renderLine = (contact) => {  

    let table = document.getElementById('contatos').getElementsByTagName('tbody')[0];

    contact.array.forEach(item => {
        
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

        cellButton.innerHTML = "<button type='button' onclick='removeContact(this)'></button>"; 

        console.log(item['name'], item['email'], item['phone']);

    });
} 

const renderAll = (contacts) => {   

    console.log(contacts);

    let table = document.getElementById('contatos').getElementsByTagName('tbody')[0];

    const newTbody = document.createElement('tbody');    

    table.parentNode.replaceChild(newTbody, table);

    table = document.getElementById('contatos').getElementsByTagName('tbody')[0];

    contact.array.forEach(item => {
        
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

        cellButton.innerHTML = "<button type='button' onclick='removeContact(this)'></button>"; 

        console.log(item['name'], item['email'], item['phone']);

    });
      
}

renderAll();

renderLine();