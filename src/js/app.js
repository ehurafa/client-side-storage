
 getAll(localStorage.getItem('db'));

const cadForm = document.getElementById('cadForm');

cadForm.addEventListener('submit', function(e) {
    
    console.log(e);
    if (cadForm.checkValidity()) {

        const formData = new formData(cadForm);

        const contact = {
            'name': formData.get('contact.name'),
            'email': formData.get('contact.email'),
            'phone': formData.get('contact.phone')
        }

        save(localStorage.db, contact);

        cadForm.reset();

        e.preventDefault();

        console.info('formulario preenchido');
    } else {
        console.error('erro');
    }
}, false);

const selectecDb = (type) => {
    cleanDb();
    localStorage.setItem('db', type);
    autoload();
    console.log('Tipo selecionado ', localStorage.getItem('db'));
}

searchEvt = document.getElementById('search');

searchEvt.addEventListener('click', (evt) => {

    const term = document.getElementBy('filter').value;

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

autoLOad = () => {
    dbSelected = document.getElementById('dbSelected');

    dbSelected.innerHTML = `Você está usando: ${storageSetup()}`;
}