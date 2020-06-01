const cadForm = document.getElementById('cadForm');

cadForm.addEventListener('submit', function(e) {
    
    if (cadForm.checkValidity()) {
        console.info('formulario preenchido');
    } else {
        console.error('erro');
    }
}, false);

storageSetup = () => {
    if(!localStorage.db) localStorage.setItem('db', "localStorage");

    return localStorage.getItem('db');
}

autoLOad = () => {
    dbSelected = document.getElementById('dbSelected');

    dbSelected.innerHTML = `Você está usando: ${storageSetup()}`;
}