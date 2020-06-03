let dbSelected = document.getElementById('dbSelected');

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
    
    if (localStorage.getItem("db"))  {
        localStorage.removeItem("db");
    }
       
}

const selectedDb = (type) => {   console.log('selectedDb');
  
    cleanDb();
    localStorage.setItem('db', type.options[type.selectedIndex].value);
   
    dbSelected.innerHTML = `Você está usando: ${storageSetup()}`;
}

const iniDb = (type) => {  console.log('func  iniDb ', type);
   if (type == "localStorage") {
        if (!localStorage.getItem("contacts"))  {
            localStorage.setItem("contacts", JSON.stringify([]));  
        }                 
   }
}


