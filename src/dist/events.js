"use strict";

cadForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(e);

  if (cadForm.checkValidity()) {
    var formData = new FormData(cadForm);
    var contact = {
      'name': formData.get('contact.name'),
      'email': formData.get('contact.email'),
      'phone': formData.get('contact.phone')
    };
    save(storageSetup(), contact);
    cadForm.reset();
    e.preventDefault();
    console.info('formulario preenchido');
  } else {
    console.error('erro');
  }
}, false);