document.addEventListener('DOMContentLoaded', function () {
    const formularioContacto = document.getElementById('formularioContacto');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

    formularioContacto.addEventListener('submit', function (event) {
        event.preventDefault();


        const inputs = formularioContacto.querySelectorAll('input, textarea');
        let camposVacios = false;
        inputs.forEach(function (input) {
            if (!input.value.trim()) {
                camposVacios = true;
            }
        });

        if (camposVacios) {
            alert('Por favor, completa todos los campos.');
        } else {

            mensajeConfirmacion.style.display = 'block';
            formularioContacto.reset();
        }
    });
});